"use client";

import Spinner from "@/components/Spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { useState } from "react";
import TrendingDay from "./TrendingDay";

const DynamicTrendingWeek = dynamic(() => import("./TrendingWeek"), {
  loading: () => (
    <p className="flex items-center justify-start gap-4">
      <Spinner /> Loading week trending...
    </p>
  ),
});

const TrendingSection = () => {
  const [showWeekTrending, setShowWeekTrending] = useState<boolean>(false);

  return (
    <div className="container">
      <Tabs defaultValue="day" className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <h2 className="m-0 font-bold">Trending</h2>
          <TabsList className="">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week" onClick={() => setShowWeekTrending(true)}>
              This Week
            </TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent value="day" className="m-0">
            <TrendingDay />
          </TabsContent>
          <TabsContent value="week" className="m-0">
            {showWeekTrending && <DynamicTrendingWeek />}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TrendingSection;
