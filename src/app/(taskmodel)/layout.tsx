import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "create task in trello",
  description: "trello's task creation page",
};

export default function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center  bg-secondary-foregound ">
      {children}
    </div>
  );
}
