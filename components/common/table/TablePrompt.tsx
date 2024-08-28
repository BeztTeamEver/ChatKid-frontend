import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import CreatePromptModal from "@/pages/prompt/component/create-prompt-modal";
import UpdatePromptModal from "@/pages/prompt/component/update-prompt";
import empty from "@/public/images/empty.png";
import { PROMPT_TYPE, PromptStatusData } from "@/types/prompt.type";
import { PromptApi } from "@/utils/promptApi";
import { Image, Input, Menu, Pagination, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TablePrompt() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<PROMPT_TYPE | null>(null);
  const [listPrompt, setListPrompt] = useState<Array<PROMPT_TYPE>>([]);
  const [totalPrompt, setTotalPrompt] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [activePage, setActivePage] = useState<number>(1);
  const router = useRouter();
  const [tempActive, setTempActive] = useState<string>("");
  const [tempInactive, setTempInactive] = useState<string>("");
  const [activeOpened, { open, close }] = useDisclosure(false);
  const debouncedSearchTerm = useDebounce(search, 100);
  const [inactiveOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await PromptApi.getListPrompt(page - 1, 10, debouncedSearchTerm, status)
      .then((res) => {
        setListPrompt(res.data.items);
        setTotalPrompt(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [debouncedSearchTerm, status]);

  useEffect(() => {
    tempActive && open();
  }, [tempActive]);

  useEffect(() => {
    tempInactive && handlers.open();
  }, [tempInactive]);

  const handleInactivePrompt = async (id: string) => {
    await PromptApi.inactivePrompt(id)
      .then((res) => {
        useToast.success("Thành công ẩn prompt 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleActivePrompt = async (id: string) => {
    await PromptApi.activePrompt(id)
      .then((res) => {
        useToast.success("Thành công hiện prompt 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const rows = listPrompt.map((prompt, index) => (
    <tr
      key={prompt.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(prompt.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>{prompt.component}</td>
      <td>{prompt.keyword}</td>
      <td>{prompt.characters}</td>
      <td className={prompt.status === "ACTIVE" ? "text-[#00B300]" : "text-[#B30000]"}>
        {prompt.status === "ACTIVE" ? "Hiện" : "Ẩn"}
      </td>
      <td className="">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical className="cursor-pointer mx-auto" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => setIsUpdating(prompt)}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              icon={prompt.status === "ACTIVE" ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                prompt.status === "ACTIVE" ? setTempInactive(prompt.id) : setTempActive(prompt.id);
              }}
            >
              {prompt.status === "ACTIVE" ? "Ẩn" : "Hiện"}
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
        <p className="text-base font-semibold text-primary-900 mr-6">Danh sách prompt</p>
        <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
          <p>Tổng số:</p>
          <p className="mx-2">{totalPrompt}</p>
        </div>
      </div>
      <div
        className="bg-white p-5 rounded-lg"
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
              placeholder="Tìm kiếm prompt"
              className="w-[280px] mr-2"
              radius="xl"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              className="w-[180px]"
              value={status}
              onChange={(e: string) => setStatus(e)}
              withAsterisk
              radius={100}
              data={PromptStatusData}
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
            onClick={() => setIsCreating(true)}
          >
            <IconPlus />
            Tạo prompt mới
          </button>
        </div>

        <Table className="rounded-md overflow-hidden">
          <thead className="bg-primary-default p-[10px]">
            <tr>
              {DataTable.Prompt.map((item, index) => (
                <th
                  key={index}
                  className={`!text-white !font-bold !text-base leading-[21.7px] ${
                    index === DataTable.Prompt.length - 1 ? "w-20" : ""
                  }`}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{isLoading ? <SkeletonFunction col={10} row={7} /> : rows}</tbody>
        </Table>
        {listPrompt.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có prompt nào phù hợp để hiển thị</p>
          </div>
        ) : null}
        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
          total={Math.ceil(totalPrompt / 10)}
          color="orange"
          className="mt-2 justify-center"
        />
        <ModalConfirm
          title="Bạn có muốn ẩn prompt này?"
          buttonContent="Ẩn prompt"
          opened={inactiveOpened}
          onOk={() => handleInactivePrompt(tempInactive)}
          onCancel={handlers.close}
          content="Sau khi ẩn prompt này các câu trả lời sẽ không bị giới hạn bởi nội dung của prompt này nữa!"
          image={0}
        />
        <ModalConfirm
          title="Bạn có muốn bỏ ẩn prompt này?"
          buttonContent="Bỏ ẩn prompt"
          content="Sau khi bỏ ẩn prompt này các câu trả lời sẽ bị giới hạn bởi nội dung của prompt này!"
          opened={activeOpened}
          onOk={() => handleActivePrompt(tempActive)}
          onCancel={close}
          image={1}
        />
        <CreatePromptModal
          opened={isCreating}
          onCancel={() => setIsCreating(false)}
          onFinish={() => {
            setIsCreating(false);
            fetchData(activePage);
          }}
        />
        <UpdatePromptModal
          prompt={isUpdating!}
          opened={!!isUpdating}
          onCancel={() => setIsUpdating(null)}
          onFinish={() => {
            setIsUpdating(null);
            fetchData(activePage);
          }}
        />
      </div>
    </div>
  );
}
