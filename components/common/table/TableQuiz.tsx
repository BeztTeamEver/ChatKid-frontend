import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import empty from "@/public/images/empty.png";
import { QUIZ_TYPE } from "@/types/quiz.type";
import { QuizApi } from "@/utils/quizApi";
import { Image, Input, Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconPlus,
  IconSearch,
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
  const [search, setSearch] = useState<string>("");
  const [tempId, setTempId] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 100);
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

  const fetchData = async (page) => {
    setActivePage(page);
    setIsLoading(true);
    await QuizApi.getListQuiz(page - 1, 10, debouncedSearchTerm)
      .then((res) => {
        setListQuiz(res.data.items);
        setTotalQuiz(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [debouncedSearchTerm]);

  const handleHideQuiz = async (id: string) => {
    await QuizApi.hideQuiz(id)
      .then((res) => {
        useToast.success("Ẩn bộ câu hỏi thành công 🎉");
        setTempId(id);
        fetchData(1);
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
        fetchData(1);
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
        fetchData(1);
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
      <div
        className="bg-white p-5 rounded-2xl flex h-fit w-full mb-3 justify-items-center"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <p className="text-base font-semibold text-primary-900 mr-6">Danh sách bộ câu hỏi</p>
        <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
          <p>Tổng số:</p>
          <p className="mx-2">{totalQuiz}</p>
        </div>
      </div>
      <div
        className="bg-white p-5 rounded-2xl"
        style={{
          boxShadow:
            "0px 6px 12px 0px rgba(78, 41, 20, 0.04), 0px -1px 2px 0px rgba(78, 41, 20, 0.02), 0px 2px 4px 0px rgba(117, 43, 1, 0.04)",
        }}
      >
        <div className="w-full flex justify-between mb-4 items-center ">
          <div className="flex items-center ">
            <Input
              icon={<IconSearch size={14} />}
              type="text"
              value={search}
              placeholder="Tìm kiếm câu hỏi"
              className="w-[280px] mr-2"
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
          <tbody>{isLoading ? <SkeletonFunction col={10} row={9} /> : rows}</tbody>
        </Table>
        {listQuiz.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có bộ câu hỏi nào phù hợp để hiển thị </p>
          </div>
        ) : null}
        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
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
    </div>
  );
}
