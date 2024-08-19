import { DataTable } from "@/constants/dataTable";
import ChecklogModal from "@/pages/reports/components/checklogModal";
import empty from "@/public/images/empty.png";
import { REPORT_TYPE, reportData } from "@/types/report.type";
import { ReportApi } from "@/utils/reportApi";
import { ActionIcon, Image, Input, Pagination, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableReport() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listReport, setListReport] = useState<Array<REPORT_TYPE>>([]);
  const [totalReport, setTotalReport] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [tempId, setTempId] = useState<string>("");
  const [createdTime, setCreatedTime] = useState("");
  const [mail, setMail] = useState("");
  const [answer, setAnswer] = useState("");
  const [voice, setVoice] = useState("");
  const [reasons, setReasons] = useState<Array<string>>([]);
  const [checklogOpened, { open, close }] = useDisclosure(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const router = useRouter();

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await ReportApi.getListReport(page - 1, 10, debouncedSearchTerm, status)
      .then((res) => {
        setListReport(res.data.items);
        setTotalReport(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, [status, debouncedSearchTerm]);

  useEffect(() => {
    tempId && open();
  }, [tempId]);

  useEffect(() => {
    createdTime && mail && open();
  }, [createdTime]);

  const rows = listReport.map((report, index) => (
    <tr
      key={report.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(report.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>

      <td>{report.familyEmail}</td>
      <td>
        {report.reasons.map((reason) => (
          <li>{reason}</li>
        ))}
      </td>
      {report.status === "ACCEPTED" ? (
        <td className="font-medium text-green-600">Xác nhận</td>
      ) : report.status === "PENDING" ? (
        <td className="font-medium text-yellow-600">Chờ duyệt</td>
      ) : (
        <td className="font-medium text-red-600">Từ chối</td>
      )}
      <td
        className="text-primary-default underline hover:text-primary-800"
        onClick={() => {
          setCreatedTime(report.createdAt);
          setMail(report.familyEmail);
          setAnswer(report.answer);
          setVoice(report.voiceUrl);
          setReasons(report.reasons);
        }}
      >
        <a>Xem chi tiết</a>
      </td>
      {report.status === "PENDING" ? (
        <td className="w-[100px] flex">
          <ActionIcon color="green" variant="outline" radius="md" className="mr-2">
            <IconCheck size="1.125rem" />
          </ActionIcon>
          <ActionIcon color="red" variant="outline" radius="md">
            <IconX size="1.125rem" />
          </ActionIcon>
        </td>
      ) : (
        <td className="w-[100px] flex">
          <ActionIcon color="green" variant="outline" radius="md" className="mr-2" disabled>
            <IconCheck size="1.125rem" />
          </ActionIcon>
          <ActionIcon color="red" variant="outline" radius="md" disabled>
            <IconX size="1.125rem" />
          </ActionIcon>
        </td>
      )}
    </tr>
  ));
  return (
    <div>
      <div className="w-full flex justify-between mb-4 items-center">
        <form
          onChange={(e) => {
            e.preventDefault();
          }}
          className="flex justify-between items-center w-1/2"
        >
          <Input
            type="text"
            placeholder="Tìm kiếm tài khoản"
            className="w-full mr-4"
            radius={100}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className="mb-1 col-span-2 w-full"
            value={status}
            onChange={(e: string) => setStatus(e)}
            withAsterisk
            radius={100}
            data={reportData}
          />
        </form>
      </div>
      <div className="w-full h-fit bg-whiterounded-2xl"></div>
      <Table className="rounded-md overflow-hidden items-center">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.Report.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.Quiz.length - 1 ? "w-20" : ""
                }`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={7} /> : rows}</tbody>
      </Table>
      {listReport.length === 0 ? (
        <div className="w-full items-center text-center">
          <Image src={empty.src} fit="contain" height={200} className=" py-10" />
          <p>Danh sách hiện không có loại công việc nào </p>
        </div>
      ) : null}

      <Pagination
        value={activePage}
        onChange={(e) => fetchData(e)}
        total={Math.ceil(totalReport / 10)}
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
        reasons={reasons}
      ></ChecklogModal>
    </div>
  );
}
