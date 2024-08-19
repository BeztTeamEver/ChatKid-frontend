import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { QUIZ_TYPE } from "@/types/quiz.type";
import { QuizApi } from "@/utils/quizApi";
import { Input, Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
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
  const [tempId, setTempId] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [hideOpened, handlersH] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [showOpened, handlersS] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [deleteOpened, handlersD] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    await QuizApi.getListQuiz(activePage - 1, 10, debouncedSearchTerm)
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

  const handleHideQuiz = async (id: string) => {
    await QuizApi.hideQuiz(id)
      .then((res) => {
        useToast.success("Ẩn bộ câu hỏi thành công 🎉");
        setTempId(id);
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
        setTempId(id);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã có lỗi xảy ra!!!!");
      });
  };

  const handleDeleteQuiz = async (id: string) => {
    await QuizApi.deleteQuiz(id)
      .then((res) => {
        useToast.success("Xóa bộ câu hỏi thành công 🎉");
        setTempId(id);
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
      <td className="text-center">{quiz.ageGroup}</td>
      <td className="text-center">{quiz.questions.length}</td>
      <td>{quiz.blog != null && <IconCheck className="text-neutral-500" />}</td>
      <td
        className={
          quiz.status === "AVAILABLE" ? "text-[#00B300] text-center" : "text-[#B30000] text-center"
        }
      >
        {quiz.status === "AVAILABLE" ? "Hiện" : "Ẩn"}
      </td>

      <td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical className="cursor-pointer mx-auto" />
          </Menu.Target>

          <Menu.Dropdown>
            {quiz.blog ? (
              ""
            ) : (
              <Menu.Item
                icon={<IconPlus size={18} />}
                className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
                onClick={() => router.push(`/quizzes/${quiz.id}/create-new-blog`)}
              >
                Thêm bài viết
              </Menu.Item>
            )}
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => router.push(`/quizzes/update-quiz/${quiz.id}`)}
            >
              Chỉnh sửa
            </Menu.Item>

            <Menu.Item
              icon={quiz.status === "AVAILABLE" ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                setTempId(quiz.id);
                quiz.status === "AVAILABLE" ? handlersH.open() : handlersS.open();
              }}
            >
              {quiz.status === "AVAILABLE" ? "Ẩn" : "Bỏ Ẩn"}
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size={18} />}
              onClick={() => {
                setTempId(quiz.id);
                handlersD.open();
              }}
            >
              Xóa
            </Menu.Item>
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
        >
          <Input
            type="text"
            placeholder="Tìm kiếm bộ câu hỏi"
            className="w-full mr-4"
            radius={100}
            onChange={(e) => setSearch(e.target.value)}
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
        title="Bạn có muốn ẩn bộ câu hỏi này?"
        buttonContent="Ẩn"
        opened={hideOpened}
        onOk={() => handleHideQuiz(tempId)}
        onCancel={handlersH.close}
        content="Sau khi ẩn, bộ câu hỏi sẽ không hiển thị trên ứng dụng KidTalkie"
        image={0}
      />
      <ModalConfirm
        title="Bạn có muốn bỏ ẩn bộ câu hỏi này?"
        buttonContent="Bỏ ẩn"
        content="Sau khi bỏ ẩn, bộ câu hỏi sẽ được hiển thị trên ứng dụng KidTalkie"
        opened={showOpened}
        onOk={() => handleShowQuiz(tempId)}
        onCancel={handlersS.close}
        image={1}
      />
      <ModalConfirm
        title="Bạn có muốn xóa bộ câu hỏi này?"
        buttonContent="Xóa"
        opened={deleteOpened}
        onOk={() => handleDeleteQuiz(tempId)}
        onCancel={handlersD.close}
        content="Sau khi xóa, bộ câu hỏi sẽ không thể hiển thị trên ứng dụng KidTalkie"
        image={0}
      />
    </div>
  );
}
