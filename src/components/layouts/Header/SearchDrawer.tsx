import { SearchForm } from "@/components/Forms/SearchForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoSearch } from "react-icons/io5";

const SearchDrawer = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger
          className={`h-10 w-10 place-items-center rounded-full border p-0 md:grid`}
        >
          <IoSearch />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Search</DrawerTitle>
            <SearchForm />
            {/* <DrawerDescription>form here</DrawerDescription> */}
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
