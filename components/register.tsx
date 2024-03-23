"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

import imageCover from "@/public/women.png";
import star from "@/public/star.png";
import google from "@/public/Google.svg";
import facebook from "@/public/Facebook.svg";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "This is not a valid email.",
  }),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
});
function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-3/5 p-4"
          >
            <h1 className="text-center font-bold text-2xl">Get Started Free</h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username01" {...field} />
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
                    <Input placeholder="username@gmail.com" {...field} />
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
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#9181F4] to-[#5038ED] px-8"
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
        <div className="my-6 font-light">Or sign up with</div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Image src={google} alt="google image" className="mr-4" /> Login
            with Google
          </Button>
          <Button variant="outline">
            <Image src={facebook} alt="facebook image" className="mr-4" /> Login
            with Facebook
          </Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gradient-to-tr from-[#9181F4] to-[#5038ED] relative">
        <div className="w-1/2 h-3/5 backdrop-blur-md bg-white/30 rounded-3xl stroke-1 relative">
          <div className="absolute w-[60%] top-4 left-4 text-white font-bold text-2xl tracking-wide">
            Very good works are waiting for you <br /> Register Now
          </div>
          <div className="bg-white absolute -translate-x-1/2 bottom-12 rounded-full">
            <Image src={star} alt="star image" />
          </div>
        </div>
        <Image
          src={imageCover}
          alt="image cover"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/5 object-cover z-10"
        />
      </div>
    </div>
  );
}

export default Register;
