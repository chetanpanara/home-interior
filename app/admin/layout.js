"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Images, Wrench, LayoutDashboard } from "lucide-react"; // ✅ Import icons

// ✅ Add icon property to each nav item
const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Service", href: "/admin/service", icon: Wrench },
  { name: "Gallary Photos", href: "/admin/gallary", icon: Images },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg w-64 fixed sm:relative z-30 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <Link href={"/admin"} className="text-2xl font-bold text-orange-600">
            Admin Panel
          </Link>
          <nav className="flex flex-col gap-1 mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded text-md font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {/* Icon */}
                  <Icon size={20} className="text-orange-500" />
                  {/* Text */}
                  <span>{item.name}</span>
                </Link>
              );
            })}
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
        <main className="mx-auto px-4 sm:px-0 mt-4">{children}</main>
      </div>
    </div>
  );
}
