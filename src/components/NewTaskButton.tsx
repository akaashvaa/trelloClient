"use client";
import React from "react";
import { ButtonType } from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function NewTaskButton({
  name,
  btnType,
  title,
  imgPath,
  small = false,
}: {
  name: string;
  btnType: ButtonType;
  title: string;
  imgPath: string;
  small?: boolean;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${name}`);
  };
  return (
    <div
      onClick={handleClick}
      className={`${
        btnType === ButtonType.primary
          ? "bg-gradient-to-t from-btn-primary to-btn-primary-deem justify-center items-center gap-x-2 font-medium"
          : "bg-gradient-to-t from-btn-secondary to-btn-secondary-deem justify-between items-center py-2 text-[16px] text-[#E3E1E1]"
      } ${
        btnType === ButtonType.primary &&
        (small === true ? "py-2 text-[16px]" : "py-2.5 ")
      } text-white flex px-2  rounded-md select-none  shadow-inner-xl drop-shadow-cm cursor-pointer`}
    >
      <p className={`text-nowrap ${small && "hidden 2xl:block"}`}>{title}</p>
      <Image
        src={imgPath}
        alt={title}
        width="25"
        height="25"
        className="w-auto h-auto"
      />
    </div>
  );
}

export default NewTaskButton;
