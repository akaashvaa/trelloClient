import Tasks from "@/components/Tasks";
import Utility from "@/components/UtilityBar";
import { featureData, TasksData } from "@/constant/data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full w-min-[450px] overflow-y-auto h-full gap-y-3 flex flex-col p-3 pr-5 m-auto  bg-secondary-foregound">
      <div className="flex flex-col px-2 md:flex-row  justify-start md:justify-between md:items-center items-start">
        <h1 className="font-barlow text-[3em] font-semibold">
          Good morning, Joe!
        </h1>
        <div className="flex justify-end w-full md:w-fit gap-2 text-start  cursor-pointer">
          <p className="text-[16px] hidden md:block text-[#080808]">
            Help and feedabck
          </p>
          <Image src="images/qns.svg" alt="qns" width="25" height="25" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-col-1 gap-5 px-2">
        {featureData.map((el) => (
          <div
            key={el.title}
            className=" flex justify-center py-4  gap-5  items-center bg-white rounded-[0.2rem] "
          >
            <Image src={el.imgPath} alt={el.title} width="76" height="70" />
            <div className="w-[15rem]">
              <h1 className="font-semibold text-[16px] text-secondary-text">
                {el.title}
              </h1>
              <p className="text-[#808080]  text-[14px]">{el.desciption}</p>
            </div>
          </div>
        ))}
      </div>
      <Utility />
      <div className="grid gap-3 lg:grid-cols-4 grid-cols-1 py-2 px-5 bg-primary-foregound rounded-lg">
        {TasksData.map((el, i) => (
          <Tasks key={el + i} type={el} />
        ))}
      </div>
    </div>
  );
}
