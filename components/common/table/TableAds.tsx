import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { ADS_TYPE } from "@/types/ads.type";
import { AdsApi } from "@/utils/adsApi";
import { Menu, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconEyeOff,
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconEye,
  IconInfoCircle,
} from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableAds({
  openFunc,
  status,
  setTypeModal,
}: {
  openFunc: Function;
  status: boolean;
  setTypeModal: Function;
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [listAds, setListAds] = useState<Array<ADS_TYPE>>([]);
  const [search, setSearch] = useState<String>("");
  const [totalAds, setTotalAds] = useState<number>(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [tempId, setTempId] = useState<string>("");

  const fetchData = async () => {
    setIsLoading(true);
    await AdsApi.getListAds(activePage - 1, 10, search)
      .then((res) => {
        setListAds(res.data.items);
        setTotalAds(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData();
  }, [activePage, status]);

  useEffect(() => {
    tempId && open();
  }, [tempId]);

  const handleHideAds = async (id: string) => {
    await AdsApi.hideAds(id)
      .then((res) => {
        useToast.success("Ẩn bài viết successfully 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
  };

  const handleShowAds = async (id: string) => {
    await AdsApi.showAds(id)
      .then((res) => {
        useToast.success("Un-ban bài viết successfully 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
  };

  const rows = listAds.map((ads, index) => (
    <tr
      key={ads.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>
        <Link
          href={`/advertising/${ads.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >
          {ads.title}
        </Link>
      </td>
      <td>{ads.type === "popup" ? "Popup" : "Trang chủ"}</td>
      <td>{ads.company}</td>
      <td>{moment(ads.startDate).format("HH:mm, DD/MM/YYYY")}</td>
      <td>{moment(ads.endDate).format("HH:mm, DD/MM/YYYY")}</td>
      <td>{ads.clicks}</td>
      <td className={ads.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {ads.status ? "Hiện" : "Ẩn"}
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
              onClick={() => router.push(`/advertising/${ads.id}`)}
            >
              Chi tiết
            </Menu.Item>
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                setTypeModal({ method: "UPDATE", data: ads });
                openFunc();
              }}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              icon={ads.status ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => (ads.status ? setTempId(ads.id) : handleShowAds(ads.id))}
            >
              {ads.status ? "Ẩn" : "Hiện"}
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
            placeholder="Tìm kiếm bài quảng cáo"
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
          className="flex gap-3 items-center bg-[#FF9B06] rounded-full px-6 py-2 text-white"
          onClick={() => {
            setTypeModal({ method: "CREATE", data: null });
            openFunc();
          }}
        >
          <IconPlus />
          Tạo bài quảng cáo mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.Ads.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.Ads.length - 1 ? "w-20" : ""
                }`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={9} /> : rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalAds / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
      <ModalConfirm
        title="Bạn có chắc muốn ẩn bài quảng cáo này?"
        buttonContent="Ẩn"
        opened={opened}
        onOk={() => handleHideAds(tempId)}
        onCancel={close}
      />
    </div>
  );
}
