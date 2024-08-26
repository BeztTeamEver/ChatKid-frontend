import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import ChecklogModal from "@/pages/reports/components/checklogModal";
import empty from "@/public/images/empty.png";
import { REPORT_TYPE, reportData } from "@/types/report.type";
import { ReportApi } from "@/utils/reportApi";
import { ActionIcon, Image, Input, Pagination, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableReport() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConfirmAccept, setIsConfirmAccept] = useState<REPORT_TYPE | null>(null);
  const [isConfirmDisagree, setIsConfirmDisagree] = useState<REPORT_TYPE | null>(null);
  const [listReport, setListReport] = useState<Array<REPORT_TYPE>>([]);
  const [totalReport, setTotalReport] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [tempId, setTempId] = useState<string>("");
  const [createdTime, setCreatedTime] = useState("");
  const [mail, setMail] = useState("");
  const [answer, setAnswer] = useState("");
  const [content, setContent] = useState("");
  const [reasons, setReasons] = useState<Array<string>>([]);
  const [checklogOpened, { open, close }] = useDisclosure(false);
  const debouncedSearchTerm = useDebounce(search, 500);

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

  const handleReplyReport = async (id: string, newStatus: "PENDING" | "ACCEPTED" | "REJECTED") => {
    await ReportApi.updateStatusReport(id, newStatus)
      .then((res) => {
        fetchData(activePage);
        useToast.success("Phản hồi báo cáo thành công 🎉");
      })
      .catch((err) => console.log(err));
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
          setContent(report.content);
          setReasons(report.reasons);
        }}
      >
        <a>Xem chi tiết</a>
      </td>
      {report.status === "PENDING" ? (
        <td className="w-[100px] flex">
          <ActionIcon
            color="green"
            variant="outline"
            radius="md"
            className="mr-2"
            onClick={() => setIsConfirmAccept(report)}
          >
            <IconCheck size="1.125rem" />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="outline"
            radius="md"
            onClick={() => setIsConfirmDisagree(report)}
          >
            <IconX size="1.125rem" />
          </ActionIcon>
        </td>
      ) : (
        <td className="w-[100px] flex">
          <p className="text-neutral-400">Đã xử lý</p>
        </td>
      )}
    </tr>
  ));
  return (
    <div>
      <div
        className="bg-white p-5 rounded-2xl flex h-fit w-full mb-3 justify-items-center items-center"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <p className="text-base font-semibold text-primary-900 mr-6">Danh sách báo cáo botchat</p>
        <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
          <p>Tổng số báo cáo:</p>
          <p className="mx-2">{totalReport}</p>
        </div>
      </div>
      <div
        className="bg-white p-5 rounded-lg"
        style={{
          boxShadow:
            "0px 6px 12px 0px rgba(78, 41, 20, 0.04), 0px -1px 2px 0px rgba(78, 41, 20, 0.02), 0px 2px 4px 0px rgba(117, 43, 1, 0.04)",
        }}
      >
        <div className="flex items-center mb-4">
          <Input
            icon={<IconSearch size={14} />}
            type="text"
            value={search}
            placeholder="Tìm kiếm tài khoản gia đình"
            className="w-[280px] mr-2"
            radius="xl"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className="mb-1 col-span-2 w-[180px]"
            value={status}
            onChange={(e: string) => setStatus(e)}
            withAsterisk
            radius="xl"
            data={reportData}
          />
          {search || status ? (
            <button
              className="w-fit px-2 text-sm font-semibold hover:text-primary-900 text-primary-700 bg-none cursor-pointer"
              onClick={() => {
                setSearch("");
                setStatus("");
              }}
            >
              Trở về mặc định
            </button>
          ) : (
            <button disabled className="w-fit px-2 text-sm font-semibold bg-none text-neutral-300">
              Mặc định
            </button>
          )}
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
        {listReport.length === 0 && !isLoading ? (
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
          content={content}
          reasons={reasons}
        />

        <ModalConfirm
          title="Bạn có muốn xác nhận báo cáo này?"
          buttonContent="Xác nhận"
          opened={!!isConfirmAccept}
          onOk={() => handleReplyReport(isConfirmAccept!.id, "ACCEPTED")}
          onCancel={() => setIsConfirmAccept(null)}
          content="Sau khi xác nhận vấn đề thì hệ thống sẽ hoàn trả kim cương cho khách hàng và không thể hoàn tác!"
          image={1}
        />
        <ModalConfirm
          title="Bạn có muốn từ chối báo cáo này?"
          buttonContent="Từ chối"
          content={`Bạn hãy để lại lời nhắn về mail ${isConfirmDisagree?.familyEmail} để khách hàng có thể hiểu được vấn đề nhé!`}
          opened={!!isConfirmDisagree}
          onOk={() => handleReplyReport(isConfirmDisagree!.id, "REJECTED")}
          onCancel={() => setIsConfirmDisagree(null)}
          image={1}
        />
      </div>
    </div>
  );
}
