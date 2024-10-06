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
import { IconArrowLeft } from "../icons";
import api from "@/api";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPassword() {
  const nav = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await api.post("/auth/forgot-password", values);
      if (data.status === 200) {
        toast.success("Vui lòng kiểm tra email để lấy mật khẩu");
        nav("/sign-in");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.errors);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-100">
        <div className="bg-white p-10 rounded-2xl">
          <div className="text-center mb-2">
            <strong className="font-semibold text-3xl">Forgot Password</strong>
            <p className="text-neutral-500 mt-3">
              No worries, we'll send your reset instructions
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
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
              <Button className="w-full mt-2 mb-4" type="submit">
                Forgot Password
              </Button>
            </form>
          </Form>
          <div className="text-center ">
            <Link to={"/sign-in"} className="flex gap-2 items-center justify-center">
              <span>
                {" "}
                <IconArrowLeft />
              </span>
              Back to login?{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
