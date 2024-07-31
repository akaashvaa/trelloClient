import Image from "next/image";
import React from "react";
import SectionTab from "./SectionTab";
import Logout from "./Logout";
import NewTaskButton from "./NewTaskButton";
import { ButtonType } from "./Button";

function LeftSidebar() {
  return (
    <div className="h-screen hidden md:flex shadow-md border-r border-[#DEDEDE] flex-col justify-between px-3 gap-2 py-3.5  text-secondary-text">
      <div className="flex flex-col gap-y-2 ">
        <div className="flex gap-1 items-center justify-start">
          <Image
            src="/images/profile.jpg"
            className="rounded-full border-2 w-auto h-auto"
            alt="profile"
            width="40"
            height="40"
          />
          <h1 className="font-medium text-black">Joe Gardner</h1>
        </div>
        <div className="flex justify-between pl-1">
          <div className="flex gap-3">
            <Image
              src="images/notification.svg"
              width="25"
              height="25"
              alt="notification"
            />
            <Image src="images/theme.svg" width="25" height="25" alt="theme" />
            <Image
              src="images/forward.svg"
              width="25"
              height="25"
              alt="forward"
            />
          </div>
          <Logout />
        </div>
        <SectionTab />
        <NewTaskButton
          name="general"
          title="Create new task"
          imgPath="images/add.svg"
          btnType={ButtonType.primary}
        />
      </div>
      <div className="flex justify-center items-center gap-2.5 py-1 my-2 border-2 bg-secondary-foregound rounded-md">
        <Image
          src="images/download.svg"
          alt="download"
          width="40"
          height="40"
          className="w-auto h-auto"
          style={{ width: "auto", height: "auto" }}
        />
        <div className="">
          <h1 className="font-medium text-[20px]">Download the app</h1>
          <p className="text-[14px]">Get the full experiance</p>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
