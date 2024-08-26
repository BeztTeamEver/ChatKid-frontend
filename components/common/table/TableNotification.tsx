import { DataTable } from "@/constants/dataTable";
import empty from "@/public/images/empty.png";
import { DataReceiver, NOTIFICATION_TYPE } from "@/types/notification.type";
import { NotificationApi } from "@/utils/notificationApi ";
import { Image, Input, Pagination, Table } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableNotification() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listNotification, setListNotification] = useState<Array<NOTIFICATION_TYPE>>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 100);
  const [totalNotification, setTotalNotification] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await NotificationApi.getListNotification(page - 1, 10, debouncedSearchTerm)
      .then((res) => {
        setListNotification(res.data.items);
        setTotalNotification(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [debouncedSearchTerm]);

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
      <td>{moment(noti.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>{moment(noti.scheduleTime).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>
        <Link
          href={`/notification/${noti.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >
          {noti.title}
        </Link>
      </td>
      <td>
        {noti.receiver
          .replace(DataReceiver[0].value, DataReceiver[0].label)
          .replace(DataReceiver[1].value, DataReceiver[1].label)}
      </td>
    </tr>
  ));

  return (
    <div>
      <div
        className="bg-white p-5 rounded-2xl flex h-fit w-full mb-3 justify-items-center"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <p className="text-base font-semibold text-primary-900 mr-6">Danh sách thông báo</p>
        <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
          <p>Tổng số:</p>
          <p className="mx-2">{totalNotification}</p>
        </div>
      </div>
      <div
        className="bg-white p-5 rounded-2xl col-span-3 h-fit w-full"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <div className="w-full flex justify-between mb-4 items-center ">
          <div className="flex items-center ">
            <Input
              icon={<IconSearch size={14} />}
              type="text"
              value={search}
              placeholder="Tìm kiếm thông báo"
              className="w-[280px] mr-2"
              radius="xl"
              onChange={(e) => setSearch(e.target.value)}
            />
            {search ? (
              <button
                className="w-fit px-2 text-sm font-semibold hover:text-primary-900 text-primary-700 bg-none cursor-pointer"
                onClick={() => setSearch("")}
              >
                Trở về mặc định
              </button>
            ) : (
              <button
                disabled
                className="w-fit px-2 text-sm font-semibold bg-none text-neutral-300"
              >
                Mặc định
              </button>
            )}
          </div>
          <button
            className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-1.5 text-white"
            onClick={() => router.push(`/notification/create-new-notification`)}
          >
            <IconPlus size={18} />
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
        {listNotification.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có thông báo nào để hiển thị </p>
          </div>
        ) : null}
        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
          total={Math.ceil(totalNotification / 10)}
          color="orange"
          className="mt-2 justify-center"
        />
      </div>
    </div>
  );
}
