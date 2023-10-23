import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { HISTORY_ADVISE_TYPE } from "@/types/historyAdvise.type";
import { Pagination, Table } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";

export default function TableHistoryAdvise() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listAdvise, setListAdvise] = useState<Array<HISTORY_ADVISE_TYPE>>([]);
  const [search, setSearch] = useState<String>("");
  const [totalAdvise, setTotalAdvise] = useState<number>(0);

  const fetchData = () => {
    // AdviseApi.getListAdvise(activePage - 1, 10, search)
    //   .then((res) => {
    //     setListAdvise(res.data.items);
    //     setTotalAdvise(res.data.totalItem);
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [activePage]);

  const rows = listAdvise.map((admin, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      {/* <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>
        <a
          href={`/admin/${admin.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >{`${admin?.lastName} ${admin.firstName}`}</a>
      </td>
      <td>{admin.gmail}</td>
      <td>{admin.phone}</td>
      <td>{moment(admin.createdAt).format("HH:mm, DD.MM.YYYY")}</td>
      <td className="capitalize">{admin.gender?.trim() === "male" ? "Nam" : "Nữ"}</td>
      <td className={admin.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {admin.status ? "Hoạt động" : "Cấm"}
      </td>
      <td className="flex gap-3 relative">
        {admin.status ? (
          <button
            className="px-5 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
            onClick={() => handleRemoveAdmin(admin.id)}
          >
            Cấm
          </button>
        ) : (
          <button
            className="px-3 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
            onClick={() => handleUnBanAdmin(admin.id)}
          >
            Bỏ cấm
          </button>
        )}
      </td> */}
    </tr>
  ));

  return (
    <div
      className="bg-white p-6 rounded-lg col-span-3"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.HistoryAdvise.map((item, index) => (
              <th key={index} className="!text-white !font-bold !text-base leading-[21.7px]">
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
        total={Math.ceil(totalAdvise / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
