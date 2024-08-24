import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import empty from "@/public/images/empty.png";
import { FAMILY_TYPE } from "@/types/family.type";
import { FamilyApi } from "@/utils/familyApi";
import { Image, Input, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableFamily() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listFamily, setListFamily] = useState<FAMILY_TYPE[]>([]);
  const [totalFamily, setTotalFamily] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tempUnBan, setTempUnBan] = useState<string>("");
  const [tempBan, setTempBan] = useState<string>("");
  const [banOpened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 100);
  const [unBanOpened, handlers] = useDisclosure(false, {});

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await FamilyApi.getListFamily(page - 1, 10, debouncedSearchTerm ?? "")
      .then((res) => {
        setListFamily(res.data.items);
        setTotalFamily(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    tempBan && open();
  }, [tempBan]);

  useEffect(() => {
    tempUnBan && handlers.open();
  }, [tempUnBan]);

  const handleBanFamily = async (id: string) => {
    await FamilyApi.banFamily(id)
      .then((res) => {
        useToast.success("Cấm tài khoản gia đình thành công 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleUnBanFamily = async (id: string) => {
    await FamilyApi.unBanFamily(id)
      .then((res) => {
        useToast.success("Bỏ cấm tài khoản gia đình thành công 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const rows = listFamily?.map((family, index) => (
    <tr
      key={index}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(family.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>
        <Link
          href={`/family/${family.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >
          {family.email}
        </Link>
      </td>
      <td>{family.name}</td>
      <td>{family.members.length} tài khoản</td>
      <td className={family.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {family.status ? "Hoạt động" : "Cấm"}
      </td>
      <td className="flex gap-3 relative">
        {family.status ? (
          <button
            className="px-5 pt-[4px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#B30000] text-[#B30000] rounded-full hover:bg-red-200 hover:text-red-900 transition-all"
            onClick={() => setTempBan(family.id)}
          >
            Cấm
          </button>
        ) : (
          <button
            className="px-3 pt-[4px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-200 hover:text-primary-700 transition-all"
            onClick={() => setTempUnBan(family.id)}
          >
            Bỏ cấm
          </button>
        )}
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
        <p className="text-base font-semibold text-primary-900 mr-6">
          Danh sách tài khoản gia đình
        </p>
        <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
          <p>Tổng số tài khoản:</p>
          <p className="mx-2">{totalFamily}</p>
        </div>
      </div>
      <div
        className="bg-white p-5 rounded-2xl col-span-3 h-fit w-full"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
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
          {search ? (
            <button
              className="w-fit px-2 text-sm font-semibold hover:text-primary-900 text-primary-700 bg-none cursor-pointer"
              onClick={() => setSearch("")}
            >
              Trở về mặc định
            </button>
          ) : (
            <button disabled className="w-fit px-2 text-sm font-semibold bg-none text-neutral-300">
              Mặc định
            </button>
          )}
        </div>

        <Table className="rounded-md overflow-hidden">
          <thead className="bg-primary-default p-[10px]">
            <tr>
              {DataTable.Family.map((item, index) => (
                <th
                  key={index}
                  className="!text-white !font-bold !text-base leading-[21.7px] last:w-24"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{isLoading ? <SkeletonFunction col={10} row={7} /> : rows}</tbody>
        </Table>

        {listFamily.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center mb-6">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có tài khoản gia đình nào để hiển thị </p>
          </div>
        ) : null}

        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
          total={Math.ceil(totalFamily / 10)}
          color="orange"
          className="mt-2 justify-center"
        />
        <ModalConfirm
          title="Bạn có muốn cấm hoạt động tài khoản gia đình này?"
          buttonContent="Cấm hoạt động"
          opened={banOpened}
          onOk={() => handleBanFamily(tempBan)}
          onCancel={close}
          content="Tài khoản gia đình sau khi bị cấm sẽ không thể hoạt động trên ứng dụng KidTalkie được nữa"
          image={0}
        />
        <ModalConfirm
          title="Bạn có muốn bỏ cấm tài khoản gia đình này?"
          buttonContent="Bỏ cấm hoạt động"
          content="Tài khoản gia đình sau khi bỏ cấm sẽ có thể hoạt động trên ứng dụng KidTalkie"
          opened={unBanOpened}
          onOk={() => handleUnBanFamily(tempUnBan)}
          onCancel={handlers.close}
          image={1}
        />
      </div>
    </div>
  );
}
