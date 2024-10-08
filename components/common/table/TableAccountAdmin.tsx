import { useToast } from "@/hooks/useToast/toast";
import { ADMIN_TYPE } from "@/types/admin.type";
import { AdminApi } from "@/utils/adminApi";
import { Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableAccountAdmin({
  openFunc,
  status,
}: {
  openFunc: Function;
  status: boolean;
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [listAdmin, setListAdmin] = useState<Array<ADMIN_TYPE>>([]);
  const [search, setSearch] = useState<String>("");
  const [totalAdmin, setTotalAdmin] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [tempId, setTempId] = useState<string>("");

  const fetchData = async () => {
    setIsLoading(true);
    await AdminApi.getListAdmin(activePage - 1, 10, search)
      .then((res) => {
        setListAdmin(res.data.items);
        setTotalAdmin(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData();
  }, [activePage, status]);

  const handleRemoveAdmin = async (id: string) => {
    await AdminApi.removeAdmin(id)
      .then((res) => {
        useToast.success("Ẩn admin thành công 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleUnBanAdmin = async (id: string) => {
    await AdminApi.unbanAdmin(id)
      .then((res) => {
        useToast.success("Bỏ cấm admin thành công 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const rows = listAdmin.map((admin, index) => (
    <tr
      key={admin.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>
        <Link
          href={`/admin/${admin.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >{`${admin?.lastName} ${admin.firstName}`}</Link>
      </td>
      <td>{admin.email}</td>
      <td>{admin.phone}</td>
      <td>{moment(admin.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td className="capitalize">
        {admin.gender?.toLowerCase()?.trim() === "male" ? "Nam" : "Nữ"}
      </td>
      <td className={admin.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {admin.status ? "Hoạt động" : "Cấm"}
      </td>
      <td className="flex gap-3 relative">
        {admin.status ? (
          <button
            className="px-5 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
            onClick={() => {
              setTempId(admin.id);
              open();
            }}
          >
            Cấm
          </button>
        ) : (
          <button
            className="px-3 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
            onClick={() => handleUnBanAdmin(admin.id)}
          >
            Bỏ cấm
          </button>
        )}
      </td>
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
            placeholder="Tìm kiếm tài khoản"
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
          onClick={() => openFunc()}
        >
          <IconPlus />
          Tạo tài khoản mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {/* {DataTable.AccountAdmin.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.AccountAdmin.length - 1 ? "w-24" : ""
                }`}
              >
                {item}
              </th>
            ))} */}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={8} /> : rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalAdmin / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
      <ModalConfirm
        title="Bạn có chắc muốn cấm admin này?"
        buttonContent="Cấm"
        content="Tài khoản gia đình sau khi bỏ cấm sẽ có thể hoạt động trên ứng dụng KidTalkie"
        opened={opened}
        onOk={() => handleRemoveAdmin(tempId)}
        onCancel={close}
        image={1}
      />
    </div>
  );
}
