import { DataTable } from "@/constants/dataTable";
import { DISCUSS_ROOM } from "@/types/expert.type";
import { Modal, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function TableHistoryAdvise({ listAdvise }: { listAdvise?: Array<DISCUSS_ROOM> }) {
  const [activePage, setActivePage] = useState<number>(1);
  const [temp, setTemp] = useState<DISCUSS_ROOM>();
  const [opened, { open, close }] = useDisclosure(false);
  const totalAdvise = listAdvise?.length || 0;

  const rows = listAdvise?.slice(10 * (activePage - 1), 10 * activePage)?.map((advise, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(advise.createdTime).format("HH:mm, DD.MM.YYYY")}</td>
      <td>{advise.id}</td>
      <td>
        <button
          className="text-[#FF9B06] hover:underline transition-all cursor-pointer w-fit"
          onClick={() => {
            setTemp(advise);
            open();
          }}
        >
          Xem
        </button>
      </td>
    </tr>
  ));

  return (
    <div
      className="bg-white p-6 rounded-lg col-span-3 h-fit"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.HistoryAdvise.map((item, index) => (
              <th
                key={index}
                className="!text-white !font-bold !text-base leading-[21.7px] last:w-72"
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
        total={Math.ceil(totalAdvise / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
      <Modal opened={opened} onClose={close} withCloseButton={false} centered className="p-6">
        <div className="w-full h-0 border-[1px] border-[#E9EAF2] relative my-2">
          <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
            Nội dung nhật ký
          </p>
        </div>
        {temp && <AudioPlayer src={temp.voiceUrl} className="rounded-md mb-5 mt-7" />}
        <div className="w-full grid grid-cols-4 gap-1 mb-3">
          <p className="text-[#252937] col-span-1 font-semibold">Mã tài khoản</p>
          <p className="text-[#464C62] font-normal col-span-3">{temp?.id}</p>
        </div>
        <div className="w-full grid grid-cols-4 gap-1">
          <p className="text-[#252937] col-span-1 font-semibold">Thời gian</p>
          <p className="text-[#464C62] font-normal col-span-3">
            {moment(temp?.createdTime).format("HH:mm, DD.MM.YYYY")}
          </p>
        </div>
      </Modal>
    </div>
  );
}
