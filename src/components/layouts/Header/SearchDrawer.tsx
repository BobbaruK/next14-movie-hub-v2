import SearchForm from "@/components/Forms/SearchForm";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { IoSearch } from "react-icons/io5";

const SearchDrawer = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger
          aria-label="Search"
          className={`grid h-10 w-10 place-items-center rounded-full border p-0`}
        >
          <IoSearch />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Search</DrawerTitle>
            <SearchForm />
            {/* <DrawerDescription>form here</DrawerDescription> */}
          </DrawerHeader>
          {/* <DrawerFooter>
            <DrawerClose type="submit">Close</DrawerClose>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
