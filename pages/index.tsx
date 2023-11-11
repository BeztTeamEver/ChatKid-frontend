"use client";

import CarouselExpert from "@/components/common/dashboard/carouselExpert";
import { DASHBOARD_TYPE } from "@/types/dashboard.type";
import { DashboardApi } from "@/utils/dashboardApi";
import {
  IconCategory,
  IconReportMoney,
  IconCoins,
  IconArrowUp,
  IconChevronLeft,
  IconChevronRight,
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
        <p>{`${month}/${year}`}</p>
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
        className="flex flex-col gap-2 bg-white rounded-[10px] px-5 py-3 border-[1px] border-neutral-100"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconCoins className="bg-primary-default text-white p-2 w-10 h-10 rounded-md" />
        <p className="text-[#BFC1CF] text-sm font-medium uppercase">
          Doanh số gói năng lượng tháng {month}
        </p>
        <p className="font-semibold text-neutral-800">
          {data?.totalSubcription?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
        </p>
      </div>
      <div
        className="flex flex-col gap-2 bg-white rounded-[10px] px-5 py-3 border-[1px] border-neutral-100"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconCategory className="bg-[#E10005] text-white p-2 w-10 h-10 rounded-md" />
        <p className="text-[#BFC1CF] text-sm font-medium uppercase">
          Doanh số quảng cáo tháng {month}
        </p>
        <p className="font-semibold text-neutral-800">
          {data?.totalAdvertising?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
        </p>
      </div>
      <div
        className="flex flex-col gap-2 bg-white rounded-[10px] px-5 py-3 border-[1px] border-neutral-100"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconReportMoney className="bg-[#2D9AFF] text-white p-2 w-10 h-10 rounded-md" />
        <p className="text-[#BFC1CF] text-sm font-medium uppercase">Tổng doanh số</p>
        <p className="font-semibold text-neutral-800">
          {data?.totalTransaction?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
        </p>
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
                data?.percentSubcription.includes("-") ? "text-[#C20024]" : "text-[#00B300]"
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
