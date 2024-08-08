"use client";

import CarouselExpert from "@/components/common/dashboard/carouselExpert";
import CoverImage from "@/public/images/statistic_cover.png";
import { DASHBOARD_TYPE } from "@/types/dashboard.type";
import { DashboardApi } from "@/utils/dashboardApi";
import { Image } from "@mantine/core";
import {
  IconCoins,
  IconArrowUp,
  IconChevronLeft,
  IconChevronRight,
  IconDiamond,
  IconUserCircle,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("@/components/common/dashboard/chart"), {
  ssr: false,
});

// const CarouselExpert = dynamic(() => import("@/components/common/dashboard/carouselExpert"), {
//   ssr: false,
// });

export default function HomePage() {
  const date = new Date();
  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [data, setData] = useState<DASHBOARD_TYPE>();

  useEffect(() => {
    DashboardApi.getDataDashboard(month, year)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [month, year]);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-3">
        <Image src={CoverImage.src} width="100%" />
      </div>
      <div className="col-span-3 flex justify-center items-center gap-1 select-none">
        <IconChevronLeft
          className="cursor-pointer bg-gray-100 rounded-sm hover:scale-110 transition-all"
          onClick={() => {
            if (month === 1) {
              setMonth(12);
              setYear(year - 1);
            } else {
              setMonth(month - 1);
            }
          }}
        />
        <p className="font-semibold text-lg">
          {month}/{year}
        </p>
        <IconChevronRight
          className="cursor-pointer bg-gray-100 rounded-sm hover:scale-110 transition-all"
          onClick={() => {
            if (month === 12) {
              setMonth(1);
              setYear(year + 1);
            } else {
              setMonth(month + 1);
            }
          }}
        />
      </div>

      <div
        className="flex align-item: center bg-white rounded-[16px] px-4 py-4 border-[1px] border-neutral-100 "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconCoins className="bg-primary-default text-white p-2 w-12 h-12 rounded-md mr-3" />
        <div>
          <p className="text-neutral-600 text-sm font-medium uppercase">Tổng doanh số</p>
          <p className="font-semibold text-neutral-800 text-lg mt-0.5">
            {/* {data?.totalSubcription?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })} */}
            1.200.000 VNĐ
          </p>
        </div>
      </div>

      <div
        className="flex align-item: center bg-white rounded-[16px] px-4 py-4 border-[1px] border-neutral-100 "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconDiamond className="bg-[#2D9AFF] text-white p-2 w-12 h-12 rounded-md mr-3" />
        <div>
          <p className="text-neutral-600 text-sm font-medium uppercase">Tổng số gói đã bán</p>
          <p className="font-semibold text-neutral-800 text-lg mt-0.5">
            {/* {data?.totalSubcription?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })} */}
            12
          </p>
        </div>
      </div>

      <div
        className="flex align-item: center bg-white rounded-[16px] px-4 py-4 border-[1px] border-neutral-100 "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconUserCircle className="bg-[#46DCE5] text-white p-2 w-12 h-12 rounded-md mr-3" />
        <div>
          <p className="text-neutral-600 text-sm font-medium uppercase">Tổng sô tài khoản</p>
          <p className="font-semibold text-neutral-800 text-lg mt-0.5">
            {/* {data?.totalSubcription?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })} */}
            45
          </p>
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-[10px] pl-5 border-[1px] border-neutral-100">
        <p className="font-semibold text-lg text-neutral-900 mt-5 -mb-3 text-center">
          Thống kê giao dịch năm {year}
        </p>
        <Chart className="w-full" data={data?.subcriptionViewModels} />
      </div>

      <div className="col-span-1 bg-white rounded-[10px] p-8 border-[1px] border-neutral-100 flex flex-col justify-between">
        <p className="font-semibold text-lg text-neutral-900">Thống kê lưu lượng tháng {month}</p>
        <div className="text-sm flex justify-between p-3 py-5 rounded-[10px] border-neutral-100 border-[1px]">
          <p className="text-neutral-600 uppercase font-medium">Số gói đã bán</p>
          <p className="flex gap-1 items-center">
            {data?.numberSubcriptions?.toString()}
            <span
              className={`${
                data?.percentSubcription?.includes("-") ? "text-[#C20024]" : "text-[#00B300]"
              } flex items-center text-[10px]`}
            >
              (
              <IconArrowUp
                className={`w-5 h-5 ${data?.percentSubcription.includes("-") && "rotate-180"}`}
              />
              {data?.percentSubcription?.toString()})
            </span>
          </p>
        </div>
        <div className="text-sm flex justify-between p-3 py-5 rounded-[10px] border-neutral-100 border-[1px]">
          <p className="text-neutral-600 uppercase font-medium">Lượng quảng cáo</p>
          <p className="flex gap-1 items-center">
            {data?.numberAdvertisings?.toString()}
            <span
              className={`${
                data?.percentAdvertisings.includes("-") ? "text-[#C20024]" : "text-[#00B300]"
              } flex items-center text-[10px]`}
            >
              (
              <IconArrowUp
                className={`w-5 h-5 ${data?.percentAdvertisings.includes("-") && "rotate-180"}`}
              />
              {data?.percentAdvertisings?.toString()})
            </span>
          </p>
        </div>
        <div className="text-sm flex justify-between p-3 py-5 rounded-[10px] border-neutral-100 border-[1px]">
          <p className="text-neutral-600 uppercase font-medium">Tài khoản mới</p>
          <p className="flex gap-1 items-center">
            {data?.totalUser?.toString()}
            <span
              className={`${
                data?.percentUser.includes("-") ? "text-[#C20024]" : "text-[#00B300]"
              } flex items-center text-[10px]`}
            >
              (
              <IconArrowUp
                className={`w-5 h-5 ${data?.percentUser.includes("-") && "rotate-180"}`}
              />
              {data?.percentUser?.toString()})
            </span>
          </p>
        </div>
        <div className="text-sm flex justify-between p-3 py-5 rounded-[10px] border-neutral-100 border-[1px]">
          <p className="text-neutral-600 uppercase font-medium">Chuyên gia tư vấn</p>
          <p className="flex gap-1 items-center">
            {data?.totalExpert?.toString()}
            <span
              className={`${
                data?.percentExpert.includes("-") ? "text-[#C20024]" : "text-[#00B300]"
              } flex items-center text-[10px]`}
            >
              (
              <IconArrowUp
                className={`w-5 h-5 ${data?.percentExpert.includes("-") && "rotate-180"}`}
              />
              {data?.percentExpert?.toString()})
            </span>
          </p>
        </div>
      </div>

      <div className="col-span-3 bg-white rounded-[10px] px-5 py-3 border-[1px] border-neutral-100 flex flex-col justify-between">
        <p className="font-semibold text-lg text-neutral-900">
          Bài viết nổi bật của tháng {month}:
        </p>
        <CarouselExpert month={month} year={year} />
      </div>
    </div>
  );
}
