import { DataTable } from "@/constants/dataTable";
import { DataReceiver, NOTIFICATION_TYPE } from "@/types/notification.type";
import { NotificationApi } from "@/utils/notificationApi ";
import { Pagination, Table } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableNotification({
  status,
  openFunc,
}: {
  status: boolean;
  openFunc: () => void;
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [listNotification, setListNotification] = useState<Array<NOTIFICATION_TYPE>>([]);
  const [search, setSearch] = useState<String>("");
  const [totalNotification, setTotalNotification] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    await NotificationApi.getListNotification(activePage - 1, 10, search)
      .then((res) => {
        setListNotification(res.data.items);
        setTotalNotification(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData();
  }, [activePage, status]);

  const rows = listNotification.map((noti, index) => (
    <tr
      key={noti.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>
        <Link
          href={`/notification/${noti.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >
          {noti.title}
        </Link>
      </td>
      <td>{noti.creatorEmail}</td>
      <td>
        {noti.receiver
          .replace(DataReceiver[0].value, DataReceiver[0].label)
          .replace(DataReceiver[1].value, DataReceiver[1].label)
          .replace(DataReceiver[2].value, DataReceiver[2].label)}
      </td>
      <td>{moment(noti.scheduleTime).format("HH:mm, DD/MM/YYYY")}</td>
    </tr>
  ));

  return (
    <div>
      <div className="w-full flex justify-between mb-4 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
          className="w-1/3 flex bg-[#F1F5FE] rounded-full overflow-hidden items-center"
        >
          <input
            type="text"
            placeholder="Tìm kiếm thông báo"
            className="w-full bg-transparent focus:outline-none py-3 px-5"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconSearch
            type="submit"
            className="w-16 h-10 text-[#8D92AA] px-5 hover:bg-[#00000010] transition-all cursor-pointer"
            onClick={fetchData}
          />
        </form>
        <button
          className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-2 text-white"
          onClick={openFunc}
        >
          <IconPlus />
          Tạo thông báo mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.Notification.map((item, index) => (
              <th key={index} className="!text-white !font-bold !text-base leading-[21.7px]">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={5} /> : rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalNotification / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
