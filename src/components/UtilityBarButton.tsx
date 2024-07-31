import Image from "next/image";
import React from "react";

function UtilityBarButton({
  imgPath,
  title,
}: {
  imgPath: string;
  title: string;
}) {
  return (
    <div className="flex gap-x-3 p-2 text-[16px] text-secondary-text rounded-[0.2rem] bg-[#F3F3F3] ">
      <p className="hidden 2xl:block">{title}</p>
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

export default UtilityBarButton;
