import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import empty from "@/public/images/empty.png";
import { DataSearchReceiver, TASK_TYPE_TYPE } from "@/types/taskType.type";
import { TaskTypeApi } from "@/utils/taskTypeApi";
import { Image, Input, Menu, Pagination, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconEdit,
  IconInfoCircle,
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

export default function TableTaskType() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConfirmDelete, setIsConfirmDelete] = useState<string>("");
  const [listTaskType, setListTaskType] = useState<Array<TASK_TYPE_TYPE>>([]);
  const [totalTaskType, setTotalTaskType] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [search, setSearch] = useState<String>("");
  const [taskCategoryId, setTaskCategoryId] = useState<string>("");
  const [tempId, setTempId] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const router = useRouter();

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await TaskTypeApi.getListTaskType(page - 1, 10, debouncedSearchTerm, taskCategoryId)
      .then((res) => {
        setListTaskType(res.data.items);
        setTotalTaskType(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, [taskCategoryId, debouncedSearchTerm]);

  useEffect(() => {
    tempId && open();
  }, [tempId]);

  const handleDeleteTaskType = async (id: string) => {
    await TaskTypeApi.deleteTaskType(id)
      .then((res) => {
        useToast.success("Thành công xóa loại công việc 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const rows = listTaskType.map((taskType, index) => (
    <tr
      key={taskType.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(taskType.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>
        <Image src={taskType.imageUrl} width={80} />
      </td>
      <td>
        <Image src={taskType.imageHomeUrl} width={120} />
      </td>
      <td>{taskType.name}</td>
      <td>{taskType.taskCategory.name}</td>
      <td className="">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical className="cursor-pointer mx-auto" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconInfoCircle size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => router.push(`/task-types/${taskType.id}`)}
            >
              Chi tiết
            </Menu.Item>
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
            >
              <Link href={`/task-types/update-task-type/${taskType.id}`}>Chỉnh sửa</Link>
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => setIsConfirmDelete(taskType.id)}
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
          onChange={(e) => {
            e.preventDefault();
          }}
          className="flex justify-between items-center w-1/2"
        >
          <Input
            type="text"
            placeholder="Tìm kiếm loại công việc"
            className="w-full mr-4"
            radius={100}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className="mb-1 col-span-2 w-full"
            value={taskCategoryId}
            onChange={(e: string) => setTaskCategoryId(e)}
            withAsterisk
            radius={100}
            data={DataSearchReceiver}
          />
        </form>
        <button
          className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-2 text-white"
          onClick={() => router.push(`/task-types/create-new-task-type`)}
        >
          <IconPlus />
          Tạo loại công việc mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden items-center">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.Task_type.map((item, index) => (
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
      {listTaskType.length === 0 ? (
        <div className="w-full items-center text-center">
          <Image src={empty.src} fit="contain" height={200} className=" py-10" />
          <p>Danh sách hiện không có loại công việc nào </p>
        </div>
      ) : null}

      <Pagination
        value={activePage}
        onChange={(e) => fetchData(e)}
        total={Math.ceil(totalTaskType / 10)}
        color="orange"
        className="mt-2 justify-center"
      />

      <ModalConfirm
        title="Bạn có chắc muốn xóa loại công việc này?"
        buttonContent="Xác nhận"
        content="Loại công việc này sau khi xóa không thể hoàn tác được."
        opened={!!isConfirmDelete}
        onOk={() => handleDeleteTaskType(isConfirmDelete)}
        onCancel={close}
        image={0}
      />
    </div>
  );
}
