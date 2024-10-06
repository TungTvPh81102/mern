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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/api";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export default function SignInPage() {
  const { login: contextLogin, googleLogin } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await api.post("/auth/signIn", values);
      console.log(data);
      if (data.status === 200) {
        contextLogin(data.data.accessToken, data.data.user);
        toast.success("Đăng nhập thành công");
      }
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
                <button onClick={googleLogin} className="font-semibold ml-3">
                  Google
                </button>
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
                    <FormLabel className="text-black dark:text-white">
                      Email
                    </FormLabel>
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
                    <FormLabel className="text-black dark:text-white ">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" dark:bg-transparent"
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
              <Link
                to="/forgot-password"
                className="text-blue-500 flex justify-end mb-2"
              >
                Forgot password?
              </Link>
              <Button
                className="w-full mt-2 mb-4 dark:bg-primary dark:text-white"
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </Form>
          <span>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
