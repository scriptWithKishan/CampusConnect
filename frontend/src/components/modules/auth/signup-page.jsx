import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/schemas/register-schema";
import { login } from "@/actions/login";
import { register } from "@/actions/register";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FormError } from "../form-error";

const SignupPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await register(data);
      const loginData = { email: data.email, password: data.password };
      await login(loginData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-8 bg-white p-4 lg:p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-35 lg:gap-60 justify-between">
            <NavLink to="/">
              <span className="text-base font-bold lg:text-xl">
                CampusConnect
              </span>
            </NavLink>
            <Button asChild variant="link" size="sm">
              <NavLink to="/sign-in">Sign in</NavLink>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            <Button
              type="submit"
              variant="elevated"
              className="self-end hover:bg-cyan-400"
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignupPage;
