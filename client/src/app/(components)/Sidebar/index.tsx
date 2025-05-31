"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  Clipboard,
  LayoutDashboard,
  LucideIcon,
  Menu,
  Settings2,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkPropTypes {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkPropTypes) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link
      href={href}
      className={`${isActive && "bg-blue-200 text-blue-500"} w-full flex ${
        isCollapsed ? "justify-center p-4" : "justify-normal pl-7 pr-4 py-4"
      } items-center gap-3 hover:bg-blue-100 transition-colors`}
    >
      <Icon className="w-6 h-6" />
      <span
        className={`${isCollapsed && "hidden"} ${
          isActive ? "font-bold" : "font-semibold"
        }`}
      >
        {label}
      </span>
      {/* <span>{href}</span> */}
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex justify-between md:justify-normal gap-3 items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>Logo</div>
        <h1
          className={`font-extrabold text-2xl ${
            isSidebarCollapsed && "hidden"
          }`}
        >
          Invoria
        </h1>
        <button
          className="rounded-full p-2 bg-gray-100 hover:bg-blue-100 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-grow mt-8 w-full">
        <SidebarLink
          href="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={Settings2}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      <div className="flex justify-center items-center mb-6">
        <p className="text-center text-xs text-gray-500">&copy; 2024 Invoria</p>
      </div>
    </div>
  );
};

export default Sidebar;
