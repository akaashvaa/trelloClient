"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { URL } from "@/constant/config";
import { utilityBarbuttonData } from "@/constant/data";
import UtilityBarButton from "./UtilityBarButton";
import { title } from "process";
import Button, { ButtonType } from "./Button";
import NewTaskButton from "./NewTaskButton";

function Utility() {
  const [query, setQuery] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/task`, {
        params: {
          q: query,
        },
      });
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  return (
    <div className="flex  flex-col gap-y-2 lg:flex-row px-2 justify-center lg:justify-between items-center text-nowrap">
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center"
        >
          <input
            onChange={handleChange}
            value={query}
            type="text"
            placeholder="Search"
            className="bg-primary-foregound  outline-none   p-2  rounded-md border border-[#E9E9E9] "
          />
        </form>
        <Image
          src="images/search.svg"
          alt="search"
          width="25"
          height="25"
          className="absolute top-0 bottom-0 right-3 my-auto"
        />
      </div>
      <div className="flex gap-x-5 ">
        {utilityBarbuttonData.map((el, i) => (
          <UtilityBarButton
            key={title + i}
            imgPath={el.imgPath}
            title={el.title}
          />
        ))}
        <NewTaskButton
          name="general"
          small={true}
          title="Create task"
          imgPath="images/add.svg"
          btnType={ButtonType.primary}
        />
      </div>
    </div>
  );
}

export default Utility;
