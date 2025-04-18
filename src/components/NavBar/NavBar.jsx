import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
    },
    {
      path: "/orders",
      label: "Orders",
      icon: <ClipboardList className="h-4 w-4 mr-2" />,
    },
    {
      path: "/new-order",
      label: "New Order",
      icon: <ShoppingCart className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center font-semibold text-lg">
          Order Management
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-4">
          <ModeToggle />

          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "bg-gray-200 dark:bg-muted font-medium"
                    : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        direction="right"
        className="md:hidden"
      >
        <DrawerContent className="w-[80%] rounded-l-lg border-l">
          <DrawerHeader className="border-b flex flex-row items-center justify-between">
            <div>
              <DrawerTitle className="font-semibold">Navigation</DrawerTitle>
              <DrawerDescription>
                Select a page to navigate to
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "bg-gray-200 dark:bg-muted font-medium"
                    : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default NavBar;
