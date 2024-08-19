import { DataTable } from "@/constants/dataTable";
import ChecklogModal from "@/pages/histories/components/checklogModal";
import empty from "@/public/images/empty.png";
import { HISTORY_TYPE } from "@/types/history.type";
import { HistoryApi } from "@/utils/historyApi";
import { Image, Input, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableHistory() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 100);
  const [activePage, setActivePage] = useState<number>(1);
  const [listHistory, setListHistory] = useState<HISTORY_TYPE[]>([]);
  const [totalHistory, setTotalHistory] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checklogOpened, { open, close }] = useDisclosure(false);
  const [createdTime, setCreatedTime] = useState("");
  const [mail, setMail] = useState("");
  const [answer, setAnswer] = useState("");
  const [voice, setVoice] = useState("");

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await HistoryApi.getListHistory(page - 1, 10, debouncedSearchTerm ?? "")
      .then((res) => {
        setListHistory(res.data.items);
        setTotalHistory(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [activePage, debouncedSearchTerm]);

  useEffect(() => {
    createdTime && mail && open();
  }, [createdTime]);

  const rows = listHistory?.map((history, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(history.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>{history.familyEmail}</td>
      <td>{history.memberName}</td>
      <td
        className="text-primary-default underline hover:text-primary-800"
        onClick={() => {
          setCreatedTime(history.createdAt);
          setMail(history.familyEmail);
          setAnswer(history.answer);
          setVoice(history.voiceUrl);
        }}
      >
        <a>Xem chi tiết</a>
      </td>
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
        }}
        className="w-1/3 flex rounded-full overflow-hidden items-center mb-5"
      >
        <Input
          type="text"
          placeholder="Tìm kiếm email"
          className="w-full mr-4"
          radius={100}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.History.map((item, index) => (
              <th
                key={index}
                className="!text-white !font-bold !text-base leading-[21.7px] last:w-32"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={5} /> : rows}</tbody>
      </Table>
      {listHistory.length === 0 ? (
        <div className="w-full items-center text-center">
          <Image src={empty.src} fit="contain" height={200} className=" py-10" />
          <p>Danh sách hiện không có lịch sử hỏi botchat nào để hiển thị </p>
        </div>
      ) : null}
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalHistory / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
      <ChecklogModal
        title="Checklog"
        opened={checklogOpened}
        onCancel={close}
        createdAt={createdTime}
        mail={mail}
        answer={answer}
        voice={voice}
      ></ChecklogModal>
    </div>
  );
}
