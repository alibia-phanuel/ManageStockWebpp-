"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(11, { message: "Doit comporter 11 caractères " }),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_NAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (values.email === adminEmail && values.password === adminPassword) {
      // Set authentication token with expiration date
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // 7 days from now
      const authData = {
        token: "adminAuthenticated",
        expiresAt: expirationDate.toISOString(),
      };

      localStorage.setItem("authData", JSON.stringify(authData));

      // Redirect to admin page
      router.push("/admin");
    } else {
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex justify-center pt-[160px] px-4  h-screen">
      <div className="flex justify-center flex-col items-center gap-8  max-w-[500px]">
        <div className=" flex flex-col gap-11">
          <div className="bg-[#4C5459] p-2 rounded-lg">
            <Image src="/asset/logo.png" width={500} height={500} alt="Logo" />
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  min-w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="email"
                      placeholder="Entré votre adresse email .."
                      {...field}
                    />
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      required
                      placeholder="Entré votre mot de passe .."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-[#4C5459]">
              Se connecter
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
