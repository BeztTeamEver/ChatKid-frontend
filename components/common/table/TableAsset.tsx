import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import empty from "@/public/images/empty.png";
import { ASSET_TYPE, AssetStatusData, AssetTypeData } from "@/types/asset.type";
import { AssetApi } from "@/utils/assetApi";
import { Image, Input, Menu, Pagination, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconInfoCircle,
  IconPlus,
} from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableAsset() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listAsset, setListAsset] = useState<Array<ASSET_TYPE>>([]);
  const [totalAsset, setTotalAsset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [activePage, setActivePage] = useState<number>(1);
  const router = useRouter();
  const [tempActive, setTempActive] = useState<string>("");
  const [tempInactive, setTempInactive] = useState<string>("");
  const [activeOpened, { open, close }] = useDisclosure(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [inactiveOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await AssetApi.getListAsset(page - 1, 10, debouncedSearchTerm, status, type)
      .then((res) => {
        setListAsset(res.data.items);
        setTotalAsset(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [debouncedSearchTerm, type, status]);

  useEffect(() => {
    tempActive && open();
  }, [tempActive]);

  useEffect(() => {
    tempInactive && handlers.open();
  }, [tempInactive]);

  const handleInactiveAsset = async (id: string) => {
    await AssetApi.inactiveAsset(id)
      .then((res) => {
        useToast.success("Thành công ẩn trang bị 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleActiveAsset = async (id: string) => {
    await AssetApi.activeAsset(id)
      .then((res) => {
        useToast.success("Thành công hiện trang bị 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const rows = listAsset.map((asset, index) => (
    <tr
      key={asset.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(asset.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>
        <Image src={asset.previewImageUrl} width={100} />
      </td>
      <td>
        <Image src={asset.imageUrl} width={100} />
      </td>
      <td>{asset.name}</td>
      <td>{asset.type}</td>
      <td>{asset.price}</td>
      <td className={asset.status === "Active" ? "text-[#00B300]" : "text-[#B30000]"}>
        {asset.status === "Active" ? "Hiện" : "Ẩn"}
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
              onClick={() => router.push(`/assets/${asset.id}`)}
            >
              Chi tiết
            </Menu.Item>
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => router.push(`/assets/update-asset/${asset.id}`)}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              icon={asset.status === "Active" ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                asset.status === "Active" ? setTempInactive(asset.id) : setTempActive(asset.id);
              }}
            >
              {asset.status === "Active" ? "Ẩn" : "Hiện"}
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
          onChange={(e) => {
            e.preventDefault();
          }}
          className="flex justify-between items-center w-2/3"
        >
          <Input
            type="text"
            placeholder="Tìm kiếm trang bị"
            className="w-full mr-4"
            radius={100}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className="mb-1 col-span-3 w-full mr-4"
            value={status}
            onChange={(e: string) => setStatus(e)}
            withAsterisk
            radius={100}
            data={AssetStatusData}
          />
          <Select
            className="mb-1 col-span-3 w-full"
            value={type}
            onChange={(e: string) => setType(e)}
            withAsterisk
            radius={100}
            data={AssetTypeData}
          />
        </form>
        <button
          className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-2 text-white"
          onClick={() => router.push(`/assets/create-new-asset`)}
        >
          <IconPlus />
          Tạo trang bị mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-primary-default p-[10px]">
          <tr>
            {DataTable.Asset.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.Asset.length - 1 ? "w-20" : ""
                }`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? <SkeletonFunction col={10} row={7} /> : rows}</tbody>
      </Table>
      {listAsset.length === 0 ? (
        <div className="w-full items-center text-center">
          <Image src={empty.src} fit="contain" height={200} className=" py-10" />
          <p>Danh sách hiện không có trang bị nào để hiển thị </p>
        </div>
      ) : null}
      <Pagination
        value={activePage}
        onChange={(e) => fetchData(e)}
        total={Math.ceil(totalAsset / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
      <ModalConfirm
        title="Bạn có muốn ẩn trang bị này?"
        buttonContent="Ẩn trang bị"
        opened={inactiveOpened}
        onOk={() => handleInactiveAsset(tempInactive)}
        onCancel={handlers.close}
        content="Tài khoản gia đình sau khi bị cấm sẽ không thể hoạt động trên ứng dụng KidTalkie được nữa"
        image={0}
      />
      <ModalConfirm
        title="Bạn có muốn bỏ ẩn trang bị này?"
        buttonContent="Bỏ ẩn trang bị"
        content="Tài khoản gia đình sau khi bỏ cấm sẽ có thể hoạt động trên ứng dụng KidTalkie"
        opened={activeOpened}
        onOk={() => handleActiveAsset(tempActive)}
        onCancel={close}
        image={1}
      />
    </div>
  );
}
