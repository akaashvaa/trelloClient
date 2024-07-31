import LeftSidebar from "@/components/LeftSidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex overflow-hidden">
      <LeftSidebar />
      {children}
    </div>
  );
}
