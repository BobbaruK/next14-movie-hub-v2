import submitSearchForm from "@/actions";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function SearchForm() {
  return (
    <>
      <form action={submitSearchForm} className="flex gap-1">
        <Input placeholder="Search..." type="text" name="searchQuery" />
        <Button type="submit" className="m-0">
          Search
        </Button>
      </form>
    </>
  );
}
