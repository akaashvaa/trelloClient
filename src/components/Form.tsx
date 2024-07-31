"use client";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import Input from "./Input";
import Button, { ButtonType } from "./Button";
import axios from "axios";
import { URL } from "@/constant/config";
import { useRouter } from "next/navigation";

type SignInForm = {
  email: string;
  password: string;
};

type SignUpForm = SignInForm & {
  fullName: string;
};

function Form({ formType }: { formType: boolean }) {
  // Set up the form initial value according to the form type
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValue: SignInForm | SignUpForm = formType
    ? {
        email: "",
        password: "",
        fullName: "",
      }
    : {
        email: "",
        password: "",
      };

  const [fields, setFields] = useState<SignInForm | SignUpForm>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiType = formType ? "/signup" : "/signin";
    const url = `${URL}/users${apiType}`;
    // console.log({ url });
    try {
      setLoading(true);
      const { data } = await axios.post(url, fields, { withCredentials: true });
      console.log(data?.response);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-[#606060] flex flex-col gap-2"
    >
      {formType && (
        <Input
          name="fullName"
          value={(fields as SignUpForm).fullName}
          onChange={onChange}
          placeholder="Full name"
        />
      )}

      <Input
        name="email"
        value={(fields as SignInForm | SignUpForm).email}
        onChange={onChange}
        placeholder="Your email"
      />
      <div className="relative pb-2">
        <Input
          name="password"
          value={(fields as SignInForm | SignUpForm).password}
          onChange={onChange}
          placeholder="Password"
          autoComplete="current-password"
        />
      </div>

      <Button
        loading={loading}
        title={!formType ? "Login" : "Sign up"}
        btnType={ButtonType.primary}
        disable={
          fields.email === "" ||
          fields.password === "" ||
          (fields as SignUpForm).fullName === ""
        }
      />
    </form>
  );
}

export default Form;
