import Form from "@/components/Form";
import Link from "next/link";

function page() {
  return (
    <div className="w-[650px] h-[480px] p-16 border border-stroke drop-shadow-md bg-primary-foregound rounded-2xl flex  flex-col justify-center items-center gap-4">
      <h1 className="text-[40px] font-semibold">
        Welcome to <span className="text-[#4534AC]">Workflow!</span>
      </h1>
      <Form formType />
      <div className="text-primary-text">
        Don’t have an account? Create a{" "}
        <Link href="/signin" className="text-blue-700">
          new account
        </Link>
      </div>
    </div>
  );
}

export default page;
