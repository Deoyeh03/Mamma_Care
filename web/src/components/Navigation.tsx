"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, LogOut, HeartPulse, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("staffRole") || "");
    setName(localStorage.getItem("staffName") || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const navLinks = [
    { name: "Emergency Alerts", href: "/dashboard", icon: Bell },
    { name: "Patient Lookup", href: "/dashboard/lookup", icon: Search },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-brand-100 rounded-xl text-brand-600">
            <HeartPulse size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">MammaCare</h2>
            <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">Hospital Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium ${
                  isActive
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "text-gray-500 mb-hover:bg-gray-50 hover:text-gray-900 hover:bg-brand-50/50"
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold shadow-inner">
              {name.charAt(0) || <Stethoscope size={20} />}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 line-clamp-1">{name || "Staff Member"}</p>
              <p className="text-xs font-medium text-brand-600">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
