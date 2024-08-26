import { DataTable } from "@/constants/dataTable";
import empty from "@/public/images/empty.png";
import { TRANSACTION_TYPE } from "@/types/transaction.type";
import { TransactionApi } from "@/utils/transactionApi";
import { Image, Input, Pagination, Table } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useEffect, useState } from "react";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableTransaction() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listTransaction, setListTransaction] = useState<TRANSACTION_TYPE[]>([]);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 100);

  const fetchData = async (page) => {
    setActivePage(page);
    setIsLoading(true);
    await TransactionApi.getListTransaction(page - 1, 10, debouncedSearchTerm)
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
    fetchData(1);
  }, [search]);

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
      <td>{100 - (transaction.actualPrice / transaction.price) * 100}%</td>
      <td className="w-[160px]">{formatCurrency(transaction.actualPrice)}</td>
    </tr>
  ));

  return (
    <div className=" col-span-3 h-fit w-full">
      <div
        className="bg-white p-6 rounded-lg col-span-3 h-fit w-full"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <div className="flex items-center mb-4 justify-between">
          <div className="bg-white rounded-2xl flex h-fit items-center">
            <p className="text-base font-semibold text-primary-900 mr-6">Danh sách giao dịch</p>
            <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
              <p>Tổng số:</p>
              <p className="mx-2">{totalTransaction}</p>
            </div>
          </div>
          <div className="flex items-center  justify-between">
            <Input
              icon={<IconSearch size={14} />}
              type="text"
              value={search}
              placeholder="Tìm kiếm giao dịch "
              className="w-[320px] mr-2"
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
        </div>
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
          <tbody>{isLoading ? <SkeletonFunction col={10} row={6} /> : rows}</tbody>
        </Table>
        {listTransaction.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có giao dịch nào phù hợp để hiển thị </p>
          </div>
        ) : null}
        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
          total={Math.ceil(totalTransaction / 10)}
          color="orange"
          className="mt-2 justify-center"
        />
      </div>
    </div>
  );
}
