"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Service", href: "/admin/service" },
  { name: "Projects", href: "/admin/projects" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg w-64 fixed sm:relative z-30 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h1>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded text-md font-medium ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 m-0 sm:m-10">
        {/* Topbar for mobile */}
        <div className="sm:hidden flex justify-between items-center bg-white px-4 py-3 shadow-md">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-lg font-semibold text-gray-700">
            Admin Panel
          </span>
        </div>

        {/* Children Content */}
        <main className="mx-auto px-4 sm:px-0 mt-16">{children}</main>
      </div>
    </div>
  );
}
