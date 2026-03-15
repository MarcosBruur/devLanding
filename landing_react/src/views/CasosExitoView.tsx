import { useMemo, useState } from "react";
import { CaseCard } from "../components/cases/CaseCard";
import { CaseCarouselControls } from "../components/cases/CaseCarouselControls";
import { cases } from "../data/content";

export function CasosExitoView() {
  const [hoveredCaseTitle, setHoveredCaseTitle] = useState<string | null>(null);
  const [currentCasePage, setCurrentCasePage] = useState(0);
  const casesPerPage = 2;

  const casePages = useMemo(
    () =>
      Array.from({ length: Math.ceil(cases.length / casesPerPage) }, (_, pageIndex) =>
        cases.slice(pageIndex * casesPerPage, pageIndex * casesPerPage + casesPerPage),
      ),
    [casesPerPage],
  );

  const hasCaseCarousel = cases.length > casesPerPage;

  const goPrevCases = () => {
    setCurrentCasePage((prev) => (prev - 1 + casePages.length) % casePages.length);
  };

  const goNextCases = () => {
    setCurrentCasePage((prev) => (prev + 1) % casePages.length);
  };

  return (
    <section
      id="casos"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
    >
      <h2 className="mb-6 text-2xl font-bold text-primary sm:text-3xl">Casos de exito</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentCasePage * 100}%)` }}
          >
            {casePages.map((page, pageIndex) => (
              <div key={`cases-page-${pageIndex}`} className="min-w-full">
                <div className="grid gap-6 md:grid-cols-2">
                  {page.map((item) => (
                    <CaseCard
                      key={item.title}
                      item={item}
                      isHovered={hoveredCaseTitle === item.title}
                      onHoverStart={() => setHoveredCaseTitle(item.title)}
                      onHoverEnd={() => setHoveredCaseTitle(null)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasCaseCarousel && <CaseCarouselControls onPrev={goPrevCases} onNext={goNextCases} />}
      </div>
    </section>
  );
}
