"use client";

import Spinner from "@/components/Spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeTrendingTabHeight } from "@/constants";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicTrendingDay = dynamic(() => import("./TrendingDay"), {
  loading: () => (
    <p className="absolute inset-0 flex items-center justify-center gap-4">
      <Spinner /> Loading day trending...
    </p>
  ),
});

const DynamicTrendingWeek = dynamic(() => import("./TrendingWeek"), {
  loading: () => (
    <p className="absolute inset-0 flex items-center justify-center gap-4">
      <Spinner /> Loading week trending...
    </p>
  ),
});

const TrendingSection = () => {
  const [showDayTrending, setShowDayTrending] = useState<boolean>(true);
  const [showWeekTrending, setShowWeekTrending] = useState<boolean>(false);

  return (
    <div className="container">
      <Tabs defaultValue="day" className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <h2 className="m-0 font-bold">Trending</h2>
          <TabsList className="">
            <TabsTrigger value="day" onClick={() => setShowDayTrending(true)}>
              Today
            </TabsTrigger>
            <TabsTrigger value="week" onClick={() => setShowWeekTrending(true)}>
              This Week
            </TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent
            value="day"
            className={`relative m-0 ${homeTrendingTabHeight}`}
          >
            {showDayTrending && <DynamicTrendingDay />}
          </TabsContent>
          <TabsContent
            value="week"
            className={`relative m-0 ${homeTrendingTabHeight}`}
          >
            {showWeekTrending && <DynamicTrendingWeek />}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TrendingSection;
