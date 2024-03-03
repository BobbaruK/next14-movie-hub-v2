import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingDay from "./TrendingDay";

const TrendingSection = () => {
  return (
    <div className="container">
      <Tabs defaultValue="day" className="">
        Trending &nbsp;&nbsp;&nbsp;
        <TabsList className="">
          <TabsTrigger value="day">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <TrendingDay />
        </TabsContent>
        <TabsContent value="week">fetch trading week</TabsContent>
      </Tabs>
    </div>
  );
};

export default TrendingSection;
