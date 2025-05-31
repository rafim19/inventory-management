"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex items-center justify-between w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-5">
        <button
          className="rounded-full p-2 bg-gray-100 hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="border border-solid border-gray-300 bg-white rounded-lg pl-10 py-2 w-60 focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between gap-5">
        <div className="hidden md:flex items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="text-gray-500" size={24} />
            <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-[0.3rem] text-gray-50 text-xs">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center cursor-pointer">
            <div className="flex items-center justify-center w-9 h-9 border border-solid rounded-full mr-2">
              Image
            </div>
            <span className="font-semibold">Rafi</span>
          </div>
        </div>
        <Link href={"/settings"}>
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
