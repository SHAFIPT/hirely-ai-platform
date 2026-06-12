"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { ThemeToggle } from "@/components/shared/navbar/theme-toggle";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { useAuth } from "@/contexts/auth-context";

// ── Password strength helper ──────────────────────────────────
function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0 – 4
}

const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = [
  "bg-muted",
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-emerald-500",
];

// ── Page ─────────────────────────────────────────────────────
export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    pwd:     "",
    confirm: "",
    agree:   false,
  });
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => getStrength(form.pwd), [form.pwd]);

  // Generic field setter
  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        [key]: key === "agree" ? e.target.checked : e.target.value,
      }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: Record<string, string> = {};
    if (!form.name.trim())
      err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Valid email required";
    if (form.pwd.length < 8)
      err.pwd = "Minimum 8 characters";
    if (form.confirm !== form.pwd)
      err.confirm = "Passwords don't match";
    if (!form.agree)
      err.agree = "You must accept the terms";

    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.pwd);
      toast.success("Account created! Please sign in to continue");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left — Brand Panel */}
      <AuthSidePanel />

      {/* Right — Form */}
      <div className="relative flex items-center
                      justify-center p-6 sm:p-10">

        {/* Theme toggle */}
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your AI-powered job search today
          </p>

          {/* Google OAuth */}
          <div className="mt-7">
            <GoogleAuthButton
              onClick={() => toast.info("Google sign-in coming soon")}
            />
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              or continue with email
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">

            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2
                                 h-4 w-4 -translate-y-1/2
                                 text-muted-foreground" />
                <Input
                  placeholder="Full name"
                  value={form.name}
                  onChange={set("name")}
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2
                                 h-4 w-4 -translate-y-1/2
                                 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password + strength bar */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2
                                 h-4 w-4 -translate-y-1/2
                                 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={form.pwd}
                  onChange={set("pwd")}
                  className="pl-10"
                />
              </div>
              {errors.pwd && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pwd}
                </p>
              )}

              {/* Strength indicator */}
              <div className="mt-2 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors
                      ${i < strength
                        ? STRENGTH_COLORS[strength]
                        : "bg-muted"
                      }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {form.pwd
                  ? STRENGTH_LABELS[strength]
                  : "Use 8+ chars with letters, numbers & symbols"}
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2
                                 h-4 w-4 -translate-y-1/2
                                 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirm}
                  onChange={set("confirm")}
                  className="pl-10"
                />
              </div>
              {errors.confirm && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirm}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={set("agree")}
                  className="mt-0.5 h-4 w-4 rounded
                             border-input accent-indigo-600"
                />
                <span className="text-muted-foreground">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-indigo-500 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-indigo-500 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agree && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.agree}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600
                         hover:bg-indigo-700"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin
                                   rounded-full border-2
                                   border-white
                                   border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm
                        text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-500
                         hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}