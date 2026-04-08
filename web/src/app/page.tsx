"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { HeartPulse, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login/staff", { email, password });
      localStorage.setItem("staffToken", res.data.token);
      localStorage.setItem("staffRole", res.data.user.role);
      localStorage.setItem("staffName", res.data.user.name);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-brand-500 rounded-2xl text-white shadow-lg mb-4">
            <HeartPulse size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">MammaCare</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Hospital Staff Portal</p>
        </div>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100/50 backdrop-blur-md rounded-2xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-[0_8px_30px_rgb(219,39,119,0.3)] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400">
          MammaCare Digital Antenatal System &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
