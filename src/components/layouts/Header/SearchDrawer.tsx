import { SearchForm } from "@/components/Forms/SearchForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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
          className={`grid h-10 w-10 place-items-center rounded-full border p-0`}
        >
          <IoSearch />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Search</DrawerTitle>
            <SearchForm
              formButton={
                <DrawerClose
                  type="submit"
                  className={`${buttonVariants({ variant: "default" })}`}
                >
                  Search
                </DrawerClose>
              }
            />
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
