import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { EXPERT_TYPE } from "@/types/expert.type";
import { ExpertApi } from "@/utils/expertApi";
import { Pagination, Table } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function TableAccountExpert({ openFunc }: { openFunc: Function }) {
  const [activePage, setActivePage] = useState<number>(1);
  const [listExpert, setListExpert] = useState<Array<EXPERT_TYPE>>([]);
  const [search, setSearch] = useState<String>("");
  const [totalExpert, setTotalExpert] = useState<number>(0);

  const fetchData = () => {
    ExpertApi.getListExpert(activePage - 1, 10, search)
      .then((res) => {
        setListExpert(res.data.items);
        setTotalExpert(res.data.totalItem);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [activePage]);

  const handleRemoveExpert = async (id: string) => {
    await ExpertApi.removeExpert(id)
      .then((res) => {
        useToast.success("Hide expert successfully 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
  };

  const handleUnBanExpert = async (id: string) => {
    await ExpertApi.unbanExpert(id)
      .then((res) => {
        useToast.success("Un-ban expert successfully 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
  };

  const rows = listExpert.map((expert, index) => (
    <tr
      key={expert.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{`${expert?.lastName} ${expert.firstName}`}</td>
      <td>{expert.gmail}</td>
      <td>{moment(expert.dateOfBirth).format("DD.MM.YYYY")}</td>
      <td>{expert.phone}</td>
      <td>{moment(expert.createdAt).format("HH:mm, DD.MM.YYYY")}</td>
      <td className="capitalize">{expert.gender?.trim() === "male" ? "Nam" : "Nữ"}</td>
      <td className={expert.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {expert.status ? "Hoạt động" : "Cấm"}
      </td>
      <td className="flex gap-3 relative">
        {expert.status ? (
          <button
            className="px-5 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
            onClick={() => handleRemoveExpert(expert.id)}
          >
            Cấm
          </button>
        ) : (
          <button
            className="px-3 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
            onClick={() => handleUnBanExpert(expert.id)}
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
          className="flex gap-3 items-center bg-[#FF9B06] rounded-full px-6 py-2 text-white"
          onClick={() => openFunc()}
        >
          <IconPlus />
          Tạo tài khoản mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.AccountExpert.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.AccountExpert.length - 1 ? "w-32" : ""
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
        total={Math.ceil(totalExpert / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
