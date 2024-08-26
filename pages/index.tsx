"use client";

import TableTransaction from "@/components/common/table/TableTransaction";
import CoverImage from "@/public/images/statistic_cover.png";
import { DASHBOARD_TYPE } from "@/types/dashboard.type";
import { DashboardApi } from "@/utils/dashboardApi";
import { Image } from "@mantine/core";
import {
  IconCoins,
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

const PieChart = dynamic(() => import("@/components/common/dashboard/pieChart"), {
  ssr: false,
});
// const CarouselExpert = dynamic(() => import("@/components/common/dashboard/carouselExpert"), {
//   ssr: false,
// });

export default function HomePage() {
  const date = new Date();
  const monthNow = date.getMonth() + 1;
  const yearNow = date.getFullYear();
  console.log(date);
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
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

      <div
        className="flex align-item: center bg-white rounded-[16px] p-2.5 border-[1px] border-neutral-100 "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconCoins className="bg-primary-default text-white p-2 w-12 h-12 rounded-lg mr-3" />
        <div>
          <p className="text-neutral-600 text-xs font-medium uppercase">Tổng doanh số</p>
          <p className="font-semibold text-neutral-800 text-lg mt-0.5">
            {data?.totalRevenue?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>

      <div
        className="flex align-item: center bg-white rounded-[16px] p-2.5 border-[1px] border-neutral-100 "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconDiamond className="bg-[#2D9AFF] text-white p-2 w-12 h-12 rounded-lg mr-3" />
        <div>
          <p className="text-neutral-600 text-xs font-medium uppercase">Tổng số gói đã bán</p>
          <p className="font-semibold text-neutral-800 text-lg ">{data?.totalPackages}</p>
        </div>
      </div>

      <div
        className="flex align-item: center bg-white rounded-[16px] p-2.5 border-[1px] border-neutral-100 "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconUserCircle className="bg-[#46DCE5] text-white p-2 w-12 h-12 rounded-md mr-3" />
        <div>
          <p className="text-neutral-600 text-xs font-medium uppercase">Tổng sô tài khoản</p>
          <p className="font-semibold text-neutral-800 text-lg mt-0.5">{data?.totalAccounts}</p>
        </div>
      </div>

      <div className="col-span-3 flex justify-center items-center gap-1 select-none">
        {month === 7 && year === 2024 ? (
          <IconChevronLeft className="cursor-pointer bg-gray-100 rounded-sm hover:scale-110 transition-all text-neutral-200" />
        ) : (
          <IconChevronLeft
            className="cursor-pointer bg-primary-100 rounded-sm hover:scale-110 transition-all text-primary-400"
            onClick={() => {
              if (month === 1) {
                setMonth(12);
                setYear(year - 1);
              } else {
                setMonth(month - 1);
              }
            }}
          />
        )}

        <p className="font-semibold text-lg text-neutral-800">
          {month}/{year}
        </p>
        {month === monthNow && year === yearNow ? (
          <IconChevronRight className="cursor-pointer bg-gray-100 rounded-sm hover:scale-110 transition-all text-neutral-200" />
        ) : (
          <IconChevronRight
            className="cursor-pointer bg-primary-100 rounded-sm hover:scale-110 transition-all text-primary-400"
            onClick={() => {
              if (month === 12) {
                setMonth(1);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}
          />
        )}
      </div>

      <div
        className="col-span-2 bg-white rounded-[10px] pl-5 border-[1px] border-neutral-100"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <p className="font-semibold text-lg text-neutral-900 mt-5 -mb-3 text-center">
          Thống kê giao dịch tháng
        </p>
        <Chart className="w-full" data={data?.monthlyTransactions} />
      </div>

      <div
        className="col-span-1 bg-white rounded-[10px] p-8 border-[1px] border-neutral-100 flex flex-col justify-between"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <p className="font-semibold text-lg text-neutral-900 text-center">
          Tỉ lệ bán các gói kim cương tháng
        </p>
        <PieChart data={data?.monthlyPackageSold} />
      </div>
      <TableTransaction />
    </div>
  );
}
