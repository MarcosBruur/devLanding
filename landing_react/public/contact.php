<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Metodo no permitido."]);
    exit;
}

function load_env_file(string $path): void
{
    if (!is_file($path) || !is_readable($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === "" || str_starts_with($line, "#") || strpos($line, "=") === false) {
            continue;
        }

        [$key, $value] = explode("=", $line, 2);
        $key = trim($key);
        $value = trim($value);
        $value = trim($value, "\"'");

        if ($key === "" || getenv($key) !== false) {
            continue;
        }

        putenv($key . "=" . $value);
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

function env_value(string $key): string
{
    $value = getenv($key);
    if ($value !== false && trim($value) !== "") {
        return trim((string) $value);
    }

    if (isset($_SERVER[$key]) && trim((string) $_SERVER[$key]) !== "") {
        return trim((string) $_SERVER[$key]);
    }

    return "";
}

function is_valid_email(string $email): bool
{
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

load_env_file(__DIR__ . "/.env");
load_env_file(dirname(__DIR__) . "/.env");
load_env_file(dirname(__DIR__, 2) . "/.env");

function parse_from_email(string $raw): array
{
    $raw = trim($raw);
    if (preg_match('/^(.*)<([^>]+)>$/', $raw, $matches) === 1) {
        $name = trim($matches[1], " \t\n\r\0\x0B\"'");
        $email = trim($matches[2]);
        return [$email, $name];
    }

    return [$raw, ""];
}

$config = [];
$configPath = __DIR__ . "/contact.config.php";

if (is_file($configPath)) {
    $loadedConfig = require $configPath;
    if (is_array($loadedConfig)) {
        $config = $loadedConfig;
    }
}

$sendgridApiKey = trim((string) ($config["SENDGRID_API_KEY"] ?? env_value("SENDGRID_API_KEY")));
$apiKey = trim((string) ($config["RESEND_API_KEY"] ?? env_value("RESEND_API_KEY")));
$fromEmail = trim((string) ($config["RESEND_FROM_EMAIL"] ?? env_value("RESEND_FROM_EMAIL")));
$toEmail = trim((string) ($config["RESEND_TO_EMAIL"] ?? env_value("RESEND_TO_EMAIL")));

if ($fromEmail === "") {
    $fromEmail = trim((string) ($config["SENDGRID_FROM_EMAIL"] ?? env_value("SENDGRID_FROM_EMAIL")));
}

if ($toEmail === "") {
    $toEmail = trim((string) ($config["SENDGRID_TO_EMAIL"] ?? env_value("SENDGRID_TO_EMAIL")));
}

if (($apiKey === "" && $sendgridApiKey === "") || $fromEmail === "" || $toEmail === "") {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "error" => "Configuracion incompleta. Define SENDGRID_* o RESEND_* en Apache/PHP.",
    ]);
    exit;
}

$rawBody = file_get_contents("php://input");
$payload = json_decode($rawBody ?: "{}", true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "JSON invalido."]);
    exit;
}

$name = trim((string) ($payload["name"] ?? ""));
$email = trim((string) ($payload["email"] ?? ""));
$message = trim((string) ($payload["message"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Faltan campos obligatorios."]);
    exit;
}

if (!is_valid_email($email)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Email invalido."]);
    exit;
}

$subject = "Nuevo contacto desde landing - " . $name;
$textBody = "Nuevo mensaje desde el formulario de contacto:\n\n"
    . "Nombre del remitente: " . $name . "\n"
    . "Email del remitente: " . $email . "\n\n"
    . "Mensaje:\n" . $message . "\n";

if ($sendgridApiKey !== "") {
    [$fromEmailOnly, $fromName] = parse_from_email($fromEmail);
    $fromPayload = ["email" => $fromEmailOnly];
    if ($fromName !== "") {
        $fromPayload["name"] = $fromName;
    }

    $requestBody = json_encode([
        "personalizations" => [[
            "to" => [["email" => $toEmail]],
            "subject" => $subject,
        ]],
        "from" => $fromPayload,
        "reply_to" => [
            "email" => $email,
        ],
        "content" => [[
            "type" => "text/plain",
            "value" => $textBody,
        ]],
    ], JSON_UNESCAPED_UNICODE);
} else {
    $requestBody = json_encode([
        "from" => $fromEmail,
        "to" => [$toEmail],
        "reply_to" => $email,
        "subject" => $subject,
        "text" => $textBody,
    ], JSON_UNESCAPED_UNICODE);
}

if ($requestBody === false) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo serializar la solicitud."]);
    exit;
}

$requestUrl = $sendgridApiKey !== "" ? "https://api.sendgrid.com/v3/mail/send" : "https://api.resend.com/emails";
$authToken = $sendgridApiKey !== "" ? $sendgridApiKey : $apiKey;
$ch = curl_init($requestUrl);

if ($ch === false) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo inicializar cURL."]);
    exit;
}

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . $authToken,
        "Content-Type: application/json",
    ],
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_TIMEOUT => 15,
]);

$responseBody = curl_exec($ch);
$curlError = curl_error($ch);
$statusCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($responseBody === false) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "error" => $curlError !== "" ? $curlError : "Error de red al contactar Resend.",
    ]);
    exit;
}

$providerPayload = json_decode($responseBody, true);
$providerError = "";

if (is_array($providerPayload)) {
    if (isset($providerPayload["message"])) {
        $providerError = trim((string) $providerPayload["message"]);
    } elseif (isset($providerPayload["errors"][0]["message"])) {
        $providerError = trim((string) $providerPayload["errors"][0]["message"]);
    }
}

if ($statusCode < 200 || $statusCode >= 300) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "error" => $providerError !== "" ? $providerError : "No se pudo enviar el email.",
    ]);
    exit;
}

echo json_encode(["ok" => true]);
