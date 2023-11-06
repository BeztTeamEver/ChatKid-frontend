import { DataTable } from "@/constants/dataTable";
import { USER_TYPE } from "@/types/user.type";
import { Pagination, Table } from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableAccountFamily({ listFamily }: { listFamily?: Array<USER_TYPE> }) {
  const [activePage, setActivePage] = useState<number>(1);
  const totalFamily = listFamily?.length || 0;

  const rows = listFamily?.slice(10 * (activePage - 1), 10 * activePage)?.map((family, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{family.role}</td>
      <td>{family.familyRole}</td>
      <td>{family.name}</td>
      <td>{family.gender === "male" ? "Nam" : "Nữ"}</td>
      <td>{moment(family.dateOfBirth).format("DD/MM/YYYY")}</td>
    </tr>
  ));

  return (
    <div
      className="bg-white p-6 rounded-lg col-span-3 h-fit w-full"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.AccountFamily.map((item, index) => (
              <th
                key={index}
                className="!text-white !font-bold !text-base leading-[21.7px] last:w-24"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{listFamily ? rows : <SkeletonFunction row={6} col={5} />}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalFamily / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
