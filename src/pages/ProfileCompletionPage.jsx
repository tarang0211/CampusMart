import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { HOSTELS } from "../data/dummyData";

export const ProfileCompletionPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const profileToken = localStorage.getItem(
    "BitMart_profile_completion_token"
  );

  const savedUser = localStorage.getItem(
    "BitMart_profile_completion_user"
  );

  let googleUser = null;

  try {
    googleUser = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error(
      "Error reading profile completion user:",
      error
    );
  }

  const [phone, setPhone] = useState("");
  const [hostel, setHostel] = useState(
    googleUser?.hostel || "HOSTEL-1"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // NO PROFILE COMPLETION SESSION
  // ==========================================

  if (!profileToken || !googleUser) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-rose-600" />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
          Profile Completion Session Expired
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Please start registration again using your Google
          account.
        </p>

        <Button
          variant="primary"
          onClick={() => navigate("/register")}
        >
          Continue with Google
        </Button>
      </div>
    );
  }

  // ==========================================
  // PHONE CHANGE
  // ==========================================

  const handlePhoneChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setPhone(value);

    if (error) {
      setError("");
    }
  };

  // ==========================================
  // COMPLETE PROFILE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedHostel = hostel.trim();

    if (!trimmedPhone) {
      setError("Phone number is required");
      return;
    }

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!trimmedHostel) {
      setError("Hostel / Residence is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://bitmart-backend-r83h.onrender.com/api/auth/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${profileToken}`,
          },
          body: JSON.stringify({
            phone: trimmedPhone,
            hostel: trimmedHostel,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to complete profile"
        );
      }

      // ==========================================
      // SAVE FINAL AUTHENTICATION
      // ==========================================

      login(data.user, data.token);

      // Remove temporary registration data
      localStorage.removeItem(
        "BitMart_profile_completion_token"
      );

      localStorage.removeItem(
        "BitMart_profile_completion_user"
      );

      showToast(
        "Profile completed successfully! Welcome to BitMart 🎉",
        "success"
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Profile completion error:",
        error
      );

      showToast(
        error.message ||
          "Something went wrong. Please try again.",
        "error"
      );

      if (
        error.message?.toLowerCase().includes("expired") ||
        error.message
          ?.toLowerCase()
          .includes("profile completion")
      ) {
        localStorage.removeItem(
          "BitMart_profile_completion_token"
        );

        localStorage.removeItem(
          "BitMart_profile_completion_user"
        );

        setError(
          "Your registration session has expired. Please register again with Google."
        );
      } else {
        setError(
          error.message ||
            "Unable to complete your profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12">
      {/* HEADER */}

      <div className="text-center space-y-3 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Complete Your Profile
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          One last step! Add your phone number and hostel to
          complete your BitMart registration.
        </p>
      </div>

      {/* GOOGLE USER INFO */}

      <div className="mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          {googleUser?.profilePicture ? (
            <img
              src={googleUser.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          )}

          <div className="min-w-0">
            <p className="font-bold text-gray-900 dark:text-white truncate">
              {googleUser?.name || "Google User"}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              {googleUser?.email || "Google account"}
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Phone Number (WhatsApp)"
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="9876543210"
          icon={Phone}
          value={phone}
          onChange={handlePhoneChange}
          error={error && !/^\d{10}$/.test(phone) ? error : ""}
          required
        />

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Hostel / Residence{" "}
            <span className="text-rose-500">*</span>
          </label>

          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

            <select
              name="hostel"
              value={hostel}
              onChange={(e) => {
                setHostel(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              className="w-full py-2.5 pl-11 pr-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {HOSTELS.filter(
                (hostelName) =>
                  hostelName !== "All Hostels"
              ).map((hostelName) => (
                <option
                  key={hostelName}
                  value={hostelName}
                >
                  {hostelName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="text-sm text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}

        {/* SECURITY INFO */}

        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />

          <div>
            <p className="font-semibold mb-1">
              Your Google account is verified
            </p>

            <p>
              Your name and email were obtained directly from
              Google. Your phone number and hostel are required
              to complete your BitMart profile.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={loading}
          icon={CheckCircle2}
          className="py-3 font-bold text-base"
        >
          {loading
            ? "Completing Profile..."
            : "Complete Registration"}
        </Button>
      </form>
    </div>
  );
};