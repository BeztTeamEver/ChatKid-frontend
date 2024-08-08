import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { QUIZ_TYPE } from "@/types/quiz.type";
import { QuizApi } from "@/utils/quizApi";
import { Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconEye,
  IconEyeOff,
  IconInfoCircle,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableQuiz() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listQuiz, setListQuiz] = useState<Array<QUIZ_TYPE>>([]);
  const [totalQuiz, setTotalQuiz] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [search, setSearch] = useState<String>("");
  const [tempShow, setTempShow] = useState<string>("");
  const [tempHide, setTempHide] = useState<string>("");
  const [hideOpened, { open, close }] = useDisclosure(false);
  const [showOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    await QuizApi.getListQuiz(activePage - 1, 10, search)
      .then((res) => {
        setListQuiz(res.data.items);
        setTotalQuiz(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData();
  }, [activePage]);

  useEffect(() => {
    tempHide && open();
  }, [tempHide]);

  useEffect(() => {
    tempShow && handlers.open();
  }, [tempShow]);

  const handleHideQuiz = async (id: string) => {
    await QuizApi.hideQuiz(id)
      .then((res) => {
        useToast.success("Ẩn bộ câu hỏi thành công 🎉");
        setTempHide(id);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã có lỗi xảy ra!!!!");
      });
  };

  const handleShowQuiz = async (id: string) => {
    await QuizApi.showQuiz(id)
      .then((res) => {
        useToast.success("Bỏ ẩn bộ câu hỏi thành công 🎉");
        setTempShow(id);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã có lỗi xảy ra!!!!");
      });
  };

  const rows = listQuiz.map((quiz, index) => (
    <tr
      key={quiz.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(quiz.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>
        <Link
          href={`/quizzes/${quiz.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >
          {quiz.title}
        </Link>
      </td>
      <td>{quiz.topic}</td>
      <td>{quiz.ageGroup}</td>
      <td>{quiz.questions.length}</td>
      {/* <td>{`${quiz.createAdmin?.lastName ?? ""} ${quiz.createAdmin?.firstName ?? ""}`}</td> */}
      <td className={quiz.status === "AVAILABLE" ? "text-[#00B300]" : "text-[#B30000]"}>
        {quiz.status === "AVAILABLE" ? "Hiện" : "Ẩn"}
      </td>
      <td className="">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical className="cursor-pointer mx-auto" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconInfoCircle size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => router.push(`/quizzes/${quiz.id}`)}
            >
              Chi tiết
            </Menu.Item>
            {/* <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                setTypeModal({ method: "UPDATE", data: quiz });
                openFunc();
              }}
            >
              Chỉnh sửa
            </Menu.Item> */}
            <Menu.Item
              icon={quiz.status === "AVAILABLE" ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() =>
                quiz.status === "AVAILABLE" ? setTempHide(quiz.id) : setTempShow(quiz.id)
              }
            >
              {quiz.status === "AVAILABLE" ? "Ẩn" : "Bỏ Ẩn"}
            </Menu.Item>
            {/* TODO: fix this feature
            <Menu.Item
              icon={<IconTrash size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
            >
              Xóa
            </Menu.Item> */}
          </Menu.Dropdown>
        </Menu>
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
            placeholder="Tìm kiếm bộ câu hỏi"
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
          className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-2 text-white"
          onClick={() => router.push(`/quizzes/create-new-quiz`)}
        >
          <IconPlus />
          Tạo bộ câu hỏi mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.Quiz.map((item, index) => (
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
        <tbody>{isLoading ? <SkeletonFunction col={10} row={8} /> : rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalQuiz / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
      <ModalConfirm
        title="Bạn có muốn ẩn bài viết này?"
        buttonContent="Ẩn"
        opened={hideOpened}
        onOk={() => handleHideQuiz(tempHide)}
        onCancel={close}
        content="Bộ câu hỏi sẽ không thể hiển thị trên ứng dụng KidTalkie sau khi ẩn"
        image={0}
      />
      <ModalConfirm
        title="Bạn có muốn bỏ ẩn bài viết này?"
        buttonContent="Bỏ ẩn"
        content="Bộ câu hỏi sẽ được hiển thị trên ứng dụng KidTalkie sau khi bỏ ẩn"
        opened={showOpened}
        onOk={() => handleShowQuiz(tempShow)}
        onCancel={handlers.close}
        image={1}
      />
    </div>
  );
}
