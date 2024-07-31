import Image from "next/image";
import React, { memo } from "react";

function SectionButton({
  imagePath,
  name,
  active,
  handleClick,
}: {
  imagePath: string;
  name: string;
  active: string;
  handleClick: (name: string) => void;
}) {
  return (
    <div
      onClick={() => handleClick(name)}
      className={`flex py-2 cursor-pointer rounded-[0.2rem] items-center pl-2 gap-x-3 hover:bg-secondary-foregound border shadow-sm w-[255px] ${
        active === name
          ? "bg-secondary-foregound  border border-stroke"
          : "border-white"
      }`}
    >
      <Image src={imagePath} alt={name} width="25" height="25" />
      <h1>{name}</h1>
    </div>
  );
}

export default memo(SectionButton);
