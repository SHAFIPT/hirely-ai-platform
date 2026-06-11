"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { ThemeToggle } from "@/components/shared/navbar/theme-toggle";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function LoginPage() {
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail]     = useState("");
  const [pwd, setPwd]         = useState("");
  const [errors, setErrors]   = useState<{
    email?: string;
    pwd?: string;
  }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const err: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email))
      err.email = "Enter a valid email";
    if (pwd.length < 6)
      err.pwd = "Password must be at least 6 characters";

    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back!");
    }, 900);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left — Brand Panel */}
      <AuthSidePanel />

      {/* Right — Form */}
      <div className="relative flex items-center 
                      justify-center p-6 sm:p-10">

        {/* Theme toggle top right */}
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your Hirely AI account
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

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 
                                 h-4 w-4 -translate-y-1/2 
                                 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 
                                 h-4 w-4 -translate-y-1/2 
                                 text-muted-foreground" />
                <Input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 
                             -translate-y-1/2 
                             text-muted-foreground 
                             hover:text-foreground"
                >
                  {show
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />
                  }
                </button>
              </div>
              {errors.pwd && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pwd}
                </p>
              )}

              {/* Forgot password */}
              <div className="mt-2 flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium 
                             text-indigo-500 
                             hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm 
                        text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-500 
                         hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}