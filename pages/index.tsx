import { IconCategory, IconReportMoney, IconCoins } from "@tabler/icons-react";

export default function HomePage() {
  const date = new Date();
  const price = 90000000;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className="flex flex-col gap-2 bg-white rounded-[10px] px-5 py-3 border-[1px] border-neutral-100"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <IconCoins className="bg-primary-default text-white p-2 w-10 h-10 rounded-md" />
        <p className="text-[#BFC1CF] text-sm font-medium uppercase">
          Doanh số gói năng lượng tháng {date.getMonth()}
        </p>
        <p className="font-semibold text-neutral-800">
          {price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
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
          Doanh số quảng cáo tháng {date.getMonth()}
        </p>
        <p className="font-semibold text-neutral-800">
          {price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
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
          {price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
        </p>
      </div>
      {/* <Welcome /> */}
    </div>
  );
}
