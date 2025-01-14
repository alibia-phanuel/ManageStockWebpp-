import Sidebar from "@/components/share/Sidebar";
import Header from "@/components/share/Header";

export default function RootLayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` antialiased flex bg-[#F7F7F7]`}>
      <Sidebar />
      <div className="flex-1 bg-[#F7F7F7]">
        <Header />
        {children}
      </div>
    </div>
  );
}
