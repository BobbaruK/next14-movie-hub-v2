import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingDay from "./TrendingDay";
import TrendingWeek from "./TrendingWeek";

const TrendingSection = () => {
  return (
    <div className="container">
      <Tabs defaultValue="day" className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <h2 className="m-0 font-bold">Trending</h2>
          <TabsList className="">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent value="day" className="m-0">
            <TrendingDay />
          </TabsContent>
          <TabsContent value="week" className="m-0">
            <TrendingWeek />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TrendingSection;
