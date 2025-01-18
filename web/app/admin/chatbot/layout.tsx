import { Toaster } from "@/components/ui/toaster";

export default function RootLayoutChatBoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {children}
      <Toaster />
    </div>
  );
}
