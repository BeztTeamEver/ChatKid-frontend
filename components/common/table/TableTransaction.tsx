import { DataTable } from "@/constants/dataTable";
import { TRANSACTION_TYPE } from "@/types/transaction.type";
import { TransactionApi } from "@/utils/transactionApi";
import { Input, Pagination, Table } from "@mantine/core";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableTransaction() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listTransaction, setListTransaction] = useState<TRANSACTION_TYPE[]>([]);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 100);

  const fetchData = async () => {
    setIsLoading(true);
    await TransactionApi.getListTransaction(activePage - 1, 10, debouncedSearchTerm)
      .then((res) => {
        setListTransaction(res.data.items);
        setTotalTransaction(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replaceAll("₫", "vnđ");
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
      <td>{moment(transaction.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>{transaction.identifier}</td>
      <td>{transaction.package.name}</td>
      <td>{(transaction.package.price / transaction.package.actualPrice) * 100 - 100}%</td>
      <td className="w-[160px]">{formatCurrency(transaction.package.price)}</td>
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
        className="w-1/3 flex  rounded-full overflow-hidden items-center mb-5"
      >
        <Input
          type="text"
          placeholder="Tìm kiếm tài khoản"
          className="w-full mr-4"
          radius={100}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.Transaction.map((item, index) => (
              <th
                key={index}
                className="!text-white !font-bold !text-base leading-[21.7px] last:w-20"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={6} row={9} /> : rows}</tbody>
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
