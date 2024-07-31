"use client";
import React, { useState } from "react";
import SectionButton from "./SectionButton";
import { sectionTabData } from "@/constant/data";

function SectionTab() {
  const [active, setActive] = useState<string>("Home");
  const handleClick = (name: string) => {
    setActive(name);
    // console.log(name);
  };
  return (
    <div className="flex flex-col gap-y-1 mt-2">
      {sectionTabData.map((el) => (
        <SectionButton
          active={active}
          handleClick={handleClick}
          key={el.name}
          imagePath={el.imagePath}
          name={el.name}
        />
      ))}
    </div>
  );
}

export default SectionTab;
