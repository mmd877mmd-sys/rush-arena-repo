"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { loginSchema } from "@/lib/zodSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  web_signup,
  web_forgot_password,
  user_dashboard,
  admin_dashboard,
} from "@/routes/websiteRoute";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/public/images/logo.jpg";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
import { showToast } from "@/app/component/application/tostify";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setloading(true);
      const dataToSubmit = { ...data };
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        dataToSubmit
      );
      if (!loginResponse.success) {
        return showToast("error", loginResponse.message);
      }
      reset();
      showToast("success", loginResponse.message);
      // dispatch(login(loginResponse.data));

      const dashboard =
        loginResponse.data.role === "admin" ? admin_dashboard : user_dashboard;

      return router.push(dashboard);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px] rounded-full"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Login Account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="example@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit">
              Log in
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={web_signup} className="text-primary underline">
              Create one
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            <Link href={web_forgot_password} className="text-primary underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
