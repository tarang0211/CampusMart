import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import { HOSTELS } from "../data/dummyData";
import { useToast } from "../context/ToastContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export const RegisterPage = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hostel: "HOSTEL-1",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Valid college email is required";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Password
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Show validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      showToast("Please correct the highlighted errors.", "error");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          hostel: formData.hostel,
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Registration successful
      setRegistrationSuccess(true);

      showToast(
        "Registration successful! Check your email to verify your account.",
        "success",
      );
    } catch (error) {
      console.error("Registration error:", error);

      showToast(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUCCESS SCREEN
  // =========================

  if (registrationSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            Registration Successful! 🎉
          </h2>

          {/* Message */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
            Your account has been created successfully.
          </p>

          {/* Verification Notice */}
          <div className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900 text-left mb-6">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />

              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                  Verify your email
                </h3>

                <p className="text-sm text-blue-800 dark:text-blue-400">
                  We've sent a verification link to:
                </p>

                <p className="font-semibold text-blue-900 dark:text-blue-200 mt-1 break-all">
                  {formData.email}
                </p>

                <p className="text-sm text-blue-800 dark:text-blue-400 mt-3">
                  Please check your inbox and click the{" "}
                  <strong>Verify Email</strong> button to activate your account.
                </p>

                <p className="text-xs text-blue-700 dark:text-blue-500 mt-3">
                  The verification link will expire after 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Link
            to="/login"
            className="inline-block w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // REGISTER FORM
  // =========================

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
          <UserPlus className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Create Your Campus Account
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Join fellow students on BitMart to buy and sell verified campus items.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegisterSubmit} className="space-y-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Rahul Sharma"
            icon={User}
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <Input
            label="College Email"
            name="email"
            type="email"
            placeholder="student@college.edu"
            icon={Mail}
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
        </div>

        {/* Hostel + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hostel */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Hostel / Residence <span className="text-rose-500">*</span>
            </label>

            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleInputChange}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {HOSTELS.filter((h) => h !== "All Hostels").map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <Input
            label="Phone Number (WhatsApp)"
            name="phone"
            placeholder="+91 98765 43210"
            icon={Phone}
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            required
          />
        </div>

        {/* Password + Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        {/* Security Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />

          <span>
            Your password is securely hashed before being stored in the
            database.
          </span>
        </div>

        {/* Email Verification Info */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-600 shrink-0" />

          <span>
            After registration, you'll receive a verification email. You must
            verify your email before logging in.
          </span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          icon={UserPlus}
          disabled={loading}
          className="py-3 font-bold text-base"
        >
          {loading ? "Creating Account..." : "Create Account & Join BitMart"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};
