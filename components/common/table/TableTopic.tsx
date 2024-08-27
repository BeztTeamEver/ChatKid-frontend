import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import CreateTopicModal from "@/pages/topics/components/createTopicModal";
import UpdateTopicModal from "@/pages/topics/components/updateTopicModal";
import empty from "@/public/images/empty.png";
import { BODY_CREATE_TOPIC, TOPIC_TYPE } from "@/types/topic.type";
import { TopicApi } from "@/utils/topicApi";
import { Image, Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableTopic() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listTopic, setListTopic] = useState<Array<TOPIC_TYPE>>([]);
  const [totalTopic, setTotalTopic] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [tempId, setTempId] = useState<string>("");
  const [topic, setTopic] = useState<BODY_CREATE_TOPIC>({ name: "", imageUrl: "" });
  const [opened, { open, close }] = useDisclosure(false);
  const [updateOpened, handlersU] = useDisclosure(false, {});
  const [createOpened, handlersC] = useDisclosure(false, {});
  const router = useRouter();

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await TopicApi.getListTopic(page - 1, 10)
      .then((res) => {
        setListTopic(res.data.items);
        setTotalTopic(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, [totalTopic]);

  useEffect(() => {
    tempId && open();
  }, [tempId]);

  const handleCreate = async () => {
    console.log("TOPIC:", topic);
    await TopicApi.createTopic(topic)
      .then((res) => {
        useToast.success("Tạo chủ đề thành công 🎉");
        fetchData(1);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleUpdate = async () => {
    console.log("TOPIC:", topic);
    await TopicApi.updateTopic(topic, tempId)
      .then((res) => {
        useToast.success("Tạo chủ đề thành công 🎉");
        fetchData(1);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };
  const rows = listTopic.map((item, index) => (
    <tr
      key={item.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{item.name}</td>
      <td>
        <Image src={item.imageUrl} width={120} />
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
              onClick={() => {
                setTempId(item.id);
                setTopic(item);
                handlersU.open();
              }}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              //   onClick={() => setIsConfirmDelete(topic.id)}
            >
              Xóa
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));
  return (
    <div className=" justify-items-center">
      <div
        className="bg-white p-5 rounded-2xl flex h-fit w-full mb-3 justify-between items-center"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <div className="flex">
          <p className="text-base font-semibold text-primary-900 mr-6">Danh sách chủ đề</p>
          <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
            <p>Tổng số:</p>
            <p className="mx-2">{totalTopic}</p>
          </div>
        </div>
        <button
          className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-1.5 text-white"
          onClick={() => handlersC.open()}
        >
          <IconPlus size={18} />
          Tạo chủ đề mới
        </button>
      </div>

      <div
        className="bg-white p-5 rounded-2xl col-span-3 h-fit justify-items-center "
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <Table className="rounded-md overflow-hidden items-center">
          <thead className="bg-primary-default p-[10px]">
            <tr>
              {DataTable.Topic.map((item, index) => (
                <th
                  key={index}
                  className={`!text-white !font-bold !text-base leading-[21.7px] ${
                    index === DataTable.Topic.length - 1 ? "w-20" : ""
                  }`}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{isLoading ? <SkeletonFunction col={10} row={4} /> : rows}</tbody>
        </Table>
        {listTopic.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có loại công việc nào </p>
          </div>
        ) : null}

        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
          total={Math.ceil(totalTopic / 10)}
          color="orange"
          className="mt-2 justify-center"
        />

        <CreateTopicModal
          opened={createOpened}
          onOk={() => handleCreate()}
          onCancel={handlersC.close}
          topic={topic}
          setTopic={setTopic}
        />
        <UpdateTopicModal
          opened={updateOpened}
          onOk={() => handleUpdate()}
          onCancel={handlersU.close}
          topic={topic}
          setTopic={setTopic}
        />
        {/* <ModalConfirm
          title="Bạn có chắc muốn xóa loại công việc này?"
          buttonContent="Xác nhận"
          content="Loại công việc này sau khi xóa không thể hoàn tác được."
          opened={!!isConfirmDelete}
          onOk={() => handleDeleteTaskType(isConfirmDelete)}
          onCancel={close}
          image={0}
        /> */}
      </div>
    </div>
  );
}
