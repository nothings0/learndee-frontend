"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import google from "@/public/Google.svg";
import facebook from "@/public/Facebook.svg";
import star from "@/public/star.png";
import imageCover from "@/public/women.png";
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

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "This is not a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function Register() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/active");
    console.log(form.getValues());
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <Form {...form}>
          <form className="w-3/5 p-4 space-y-6" onSubmit={onSubmit}>
            <h1 className="text-center font-bold text-2xl">Get started free</h1>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
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
                className="bg-gradient-to-r from-[#9181F4] to-[#5038ED]"
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
        <div className="my-6 font-light">Or sign up with</div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Image src={google} alt="google image" /> Login with google
          </Button>
          <Button variant="outline">
            <Image src={facebook} alt="facebook image" /> Login with facebook
          </Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gradient-to-tr from-[#9181F4] to-[#5038ED] relative">
        <div className="w-1/2 h-3/5 backdrop-blur-md bg-white/30 rounded-3xl stroke-1 relative">
          <div className="absolute w-[60%] top-4 left-4 text-white font-bold text-2xl tracking-wide">
            Very good works are waiting for you <br /> Register now
          </div>
          <div className="bg-whte absolute -translate-x-1/2 -translate-y-1/2 bottom-12 rounded-full">
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
