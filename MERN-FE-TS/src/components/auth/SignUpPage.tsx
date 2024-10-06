/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/api";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const nav = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/auth/signUp", values);
      toast.success("Đăng ký thành công");
      nav("/sign-in");
    } catch (error: any) {
      toast.error(error?.response?.data?.errors);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-grayDarker">
        <div className="bg-white p-10 rounded-2xl dark:bg-grayDarkest">
          <div className="text-center">
            <strong className="font-semibold text-3xl">
              Create your account
            </strong>
            <p className="text-neutral-500 mt-3">
              Welcome! Please fill in the details to get started
            </p>
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-lg p-1 mt-5 flex items-center justify-center border border-neutral-300">
                <i className="fa-brands fa-google"></i>
                <span className="font-semibold ml-3">Google</span>
              </div>
              <div className="rounded-lg p-1 mt-5 flex items-center justify-center border border-neutral-300">
                <i className="fa-brands fa-facebook"></i>
                <span className="font-semibold ml-3">Facebook</span>
              </div>
            </div>
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-neutral-300"></div>
              <span className="text-neutral-500 mx-3">or</span>
              <div className="flex-grow border-t border-neutral-300"></div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-black dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-white dark:bg-transparent"
                        type="email"
                        placeholder="Enter email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-black dark:text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-white dark:bg-transparent"
                        type="password"
                        placeholder="Enter password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-black dark:text-white">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-white dark:bg-transparent"
                        type="password"
                        placeholder="Enter confirm password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button className="w-full mt-2 mb-4 dark:bg-primary dark:text-white" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
          <span>
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
