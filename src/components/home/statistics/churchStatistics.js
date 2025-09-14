import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StatPieChart from "./statPieChart";
import publicStatisticsService from "../../../services/publicStatisticsService";

export default function ChurchStatistics() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Replace useEffect with TanStack Query
  const {
    data: chartData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["churchStatistics"],
    queryFn: async () => {
      const response = await publicStatisticsService.getChurchStatistics();
      return publicStatisticsService.formatChartData(response);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  // Calculate how many pairs we have (showing 2 charts at a time on desktop, 1 on mobile)
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const chartsPerSlide = isDesktop ? 2 : 1;
  const totalSlides = Math.ceil(chartData.length / chartsPerSlide);

  // Auto-rotation effect (only create interval when we have data)
  useState(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 10000);
      return () => clearInterval(interval);
    }
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full lg:w-1/5 bg-slate-800 p-4 lg:p-6 lg:py-8 lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        <div className="flex flex-col h-full w-full items-center justify-center min-h-[300px] lg:min-h-full">
          <div className="loading loading-spinner loading-lg text-blue-400"></div>
          <p className="mt-4 text-sm text-gray-300">Memuat statistik...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full lg:w-1/5 bg-slate-800 p-4 lg:p-6 lg:py-8 lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        <div className="flex flex-col h-full w-full items-center justify-center min-h-[300px] lg:min-h-full">
          <div className="text-red-400 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm text-gray-300">
              Gagal memuat statistik gereja
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no data
  if (!chartData.length) {
    return null;
  }

  return (
    <div className="w-full lg:w-1/5 bg-base-300 p-4 lg:p-6 lg:py-16 lg:sticky lg:top-0 lg:h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        {/* Chart container */}
        <div className="flex-1 relative overflow-hidden min-h-[300px] lg:min-h-0">
          <div
            className="transition-transform duration-500 ease-in-out h-full"
            style={{
              transform: `translateY(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }, (_, slideIndex) => {
              const startIdx = slideIndex * chartsPerSlide;
              const endIdx = startIdx + chartsPerSlide;
              const slideCharts = chartData.slice(startIdx, endIdx);

              return (
                <div
                  key={slideIndex}
                  className="h-full w-full flex flex-col gap-4 lg:gap-6 py-2 lg:py-4"
                >
                  {slideCharts.map((chart, chartIndex) => (
                    <div
                      key={`${slideIndex}-${chartIndex}`}
                      className="flex-1 min-h-0"
                    >
                      <StatPieChart
                        title={chart.title}
                        data={chart.data}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicators at bottom */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-2 py-4">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentIndex ? "bg-primary" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
