import Image from "next/image";
import React from "react";

function TaskHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-[#555555] text-[1em] lg:text-[16px] xl:text-[1em] text-nowrap">
        {title}
      </p>
      <Image src="images/option.svg" alt={title} width="25" height="25" />
    </div>
  );
}

export default TaskHeader;
