import WeeklySummary from "@/components/home/cta/weeklySummary";
import JoinUs from "@/components/home/cta/joinUs";
import ScheduleRow from "@/components/home/schedule/scheduleRow";
import OurLocation from "@/components/home/ourLocation";
import ChurchStatistics from "@/components/home/statistics/churchStatistics";

import { ctaTexts, schedules } from "@/json/dummyHome";
import ChurchStatisticsHorizontal from "@/components/home/statistics/churchStatisticsHorizontal";
import NewsRow from "@/components/home/newsRow";

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Mobile Layout - Vertical Stack */}
      <div className="lg:hidden">
        {/* Hero Section */}
        <div className="relative flex justify-start items-center h-screen">
          <img
            src="/header/home.jpg"
            alt="Home Head"
            className="object-cover w-full h-full"
          />
          <div className="absolute flex flex-col p-8">
            <p className="text-white text-2xl font-bold">Welcome to</p>
            <h1 className="text-white text-4xl font-bold">
              GMIT Imanuel Oepura
            </h1>
            <p className="text-white text-base">
              Together in love, growing in faith, serving in hope.
            </p>
          </div>
        </div>

        {/* Mobile Statistics - Vertical */}
        <ChurchStatistics />

        {/* Rest of content */}
        <ChurchStatisticsHorizontal />
        <NewsRow />

        <div className="p-4 min-h-screen flex flex-col gap-4">
          <JoinUs />
          <WeeklySummary />
        </div>

        <div className="relative min-h-fit">
          <img
            src="/header/home.jpg"
            alt="Home Head"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="relative z-10 flex flex-col w-full p-4">
            <ScheduleRow 
              jenisIbadah="Cell Group/Kelompok Kecil" 
              title="Jadwal Cell Group" 
              limit={4} 
            />
            <ScheduleRow 
              kategori="Keluarga" 
              title="Jadwal Ibadah Keluarga" 
              limit={6} 
            />
            <ScheduleRow 
              title="Semua Jadwal Ibadah" 
              limit={4} 
            />
          </div>
        </div>

        <div className="w-full p-4">
          <OurLocation />
        </div>
      </div>

      {/* Desktop Layout - Side-by-side */}
      <div className="hidden lg:flex">
        {/* Left Column - Church Statistics (Sidebar) */}
        <ChurchStatistics />

        {/* Right Column - Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Hero */}
          <div className="relative flex justify-start items-center h-screen">
            <img
              src="/header/home.jpg"
              alt="Home Head"
              className="object-cover w-full h-full"
            />
            <div className="absolute flex flex-col p-16">
              <p className="text-white text-4xl font-bold">Welcome to</p>
              <h1 className="text-white text-6xl font-bold">
                GMIT Imanuel Oepura
              </h1>
              <p className="text-white text-lg">
                Together in love, growing in faith, serving in hope.
              </p>
            </div>
          </div>

          {/* Horizontal Statistics */}
          <ChurchStatisticsHorizontal />

          {/* News */}
          <NewsRow />

          {/* CTA */}
          <div className="p-8 min-h-screen flex flex-col gap-4">
            <JoinUs />
            <WeeklySummary />
          </div>

          {/* Schedule */}
          <div className="relative min-h-fit">
            <img
              src="/header/home.jpg"
              alt="Home Head"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="relative z-10 flex flex-col w-full p-8">
              <ScheduleRow 
                jenisIbadah="Cell Group/Kelompok Kecil" 
                title="Jadwal Cell Group" 
                limit={4} 
              />
              <ScheduleRow 
                kategori="Keluarga" 
                title="Jadwal Ibadah Keluarga" 
                limit={6} 
              />
              <ScheduleRow 
                title="Semua Jadwal Ibadah" 
                limit={4} 
              />
            </div>
          </div>

          {/* Location */}
          <div className="w-full p-8">
            <OurLocation />
          </div>
        </div>
      </div>
    </div>
  );
}
