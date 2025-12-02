import { Logo } from "../shared";
import { Menu } from "./Menu";
import { RightNav } from "./RightNav";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex flex-col bg-white min-h-16 py-5 px-10 md:20 lg:px-30">
      <div className="flex justify-between">
        <Logo />
        <div className="flex items-center space-x-10">
          <div className="hidden md:block">
            <Menu />
          </div>
          <RightNav />
        </div>
      </div>
      <div className="flex justify-center w-full border-b py-2 border-gray-100 md:hidden">
        <Menu />
      </div>
    </nav>
  );
};
