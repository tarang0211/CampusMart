import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Mail, Lock, Building2, LogIn, ShieldCheck } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    // Check fields
    if (!cleanEmail || !password) {
      showToast("Please enter your email and password.", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://bitmart-backend-r83h.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        },
      );

      const data = await response.json();

      // Backend error
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check response
      if (!data.token || !data.user) {
        throw new Error("Invalid login response from server.");
      }

      // Save user + JWT
      login(data.user, data.token);

      showToast("Welcome back to BitMart! 👋", "success");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      showToast(
        error.message || "Something went wrong. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      {/* MAIN LOGIN CARD */}

      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 text-white flex flex-col justify-between">
            {/* Logo + Heading */}

            <div className="space-y-6">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>

                <span className="font-extrabold text-2xl">BitMart</span>
              </Link>

              {/* Description */}

              <div className="space-y-2 pt-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Exclusive Marketplace for College Students
                </h2>

                <p className="text-blue-100 text-sm leading-relaxed">
                  Connect directly with hostel mates to buy and sell textbooks,
                  electronics, and room gear effortlessly.
                </p>
              </div>
            </div>

            {/* Image */}

            <div className="my-8">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Campus Students"
                className="w-full h-48 object-cover rounded-2xl border border-white/20 shadow-xl"
              />
            </div>

            {/* Security */}

            <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />

              <span>Secure Student Authentication</span>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto space-y-6">
              {/* Heading */}

              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Log in to your account
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enter your registered email and password.
                </p>
              </div>

              {/* =========================
                  LOGIN FORM
              ========================= */}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email */}

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter Your Email"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Password */}

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Login Button */}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={LogIn}
                  disabled={loading}
                  className="py-3 font-bold"
                >
                  {loading ? "Signing In..." : "Sign In to BitMart"}
                </Button>
              </form>

              {/* Register */}

              <div className="pt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create College Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
