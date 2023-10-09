import { dataHeaderAccount } from "@/constants/dataTableHeadAccount";
import { Pagination, Table } from "@mantine/core";
import { IconDotsVertical, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const elements = [
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
  {
    code: "MJ23JFPTU",
    email: "khanhdoan@gmail.com",
    acountActivated: 5,
    phoneNumber: "0123456789",
    createdAt: "08:32, 10.08.2023",
  },
];

export default function TableAccount() {
  const [activePage, setActivePage] = useState(1);

  const rows = elements.map((element, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1}</td>
      <td>{element.code}</td>
      <td>{element.email}</td>
      <td>{element.acountActivated} tài khoản</td>
      <td>{element.phoneNumber}</td>
      <td>{element.createdAt}</td>
      <td className="flex gap-3 relative">
        <button className="px-5 pt-[6px] pb-1 text-xs bg-[#FDECEC] border-[1px] border-[#FF5757] text-[#FF5757] rounded-full hover:bg-[#FF5757] hover:text-white transition-all">
          Từ chối
        </button>
        <button className="px-5 pt-[6px] pb-1 text-xs bg-[#F1FEF1] border-[1px] border-[#00B203] text-[#00B203] rounded-full hover:bg-[#00B203] hover:text-white transition-all">
          Xác nhận
        </button>
        <IconDotsVertical className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer" />
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="w-full flex justify-between mb-4 items-center">
        <div className="w-1/3 flex bg-[#F1F5FE] rounded-full overflow-hidden items-center">
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản"
            className="w-full bg-transparent focus:outline-none py-3 px-5"
          />
          <IconSearch className="w-16 h-10 text-[#8D92AA] px-5 hover:bg-[#00000010] transition-all cursor-pointer" />
        </div>
        <button className="flex gap-3 items-center bg-[#FF9B06] rounded-full px-6 py-2 text-white">
          <IconPlus />
          Tạo tài khoản mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {dataHeaderAccount.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === dataHeaderAccount.length - 1 ? "w-60" : ""
                }`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={10}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
