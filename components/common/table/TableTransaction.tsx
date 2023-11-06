import { DataTable } from "@/constants/dataTable";
import { TRANSACTION_TYPE } from "@/types/transaction.type";
import { TransactionApi } from "@/utils/transactionApi";
import { Pagination, Table } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableTransaction() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listTransaction, setListTransaction] = useState<TRANSACTION_TYPE[]>([]);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setIsLoading(true);
    await TransactionApi.getListTransaction(activePage - 1, 10, searchRef.current?.value ?? "")
      .then((res) => {
        setListTransaction(res.data.items);
        setTotalTransaction(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData();
  }, [activePage]);

  const rows = listTransaction?.map((transaction, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{transaction.type}</td>
      <td>{moment(transaction.createdAt).format("HH:mm, DD/MM/YYYY")}</td>
      <td>{transaction.id}</td>
      <td>{transaction.discountDescription}</td>
      <td>{transaction.price}</td>
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
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
        className="w-1/3 flex bg-[#F1F5FE] rounded-full overflow-hidden items-center mb-5"
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Tìm kiếm tài khoản"
          className="w-full bg-transparent focus:outline-none py-3 px-5"
        />
        <IconSearch
          type="submit"
          className="w-16 h-10 text-[#8D92AA] px-5 hover:bg-[#00000010] transition-all cursor-pointer"
          onClick={fetchData}
        />
      </form>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.Transaction.map((item, index) => (
              <th
                key={index}
                className="!text-white !font-bold !text-base leading-[21.7px] last:w-32"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={6} /> : rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalTransaction / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
