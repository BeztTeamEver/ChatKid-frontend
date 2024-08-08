import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import empty from "@/public/images/empty.png";
import { FAMILY_TYPE } from "@/types/family.type";
import { FamilyApi } from "@/utils/familyApi";
import { Image, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableFamily() {
  const [activePage, setActivePage] = useState<number>(1);
  const [listFamily, setListFamily] = useState<FAMILY_TYPE[]>([]);
  const [totalFamily, setTotalFamily] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [tempUnBan, setTempUnBan] = useState<string>("");
  const [tempBan, setTempBan] = useState<string>("");
  const [banOpened, { open, close }] = useDisclosure(false);
  const [unBanOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const fetchData = async () => {
    setIsLoading(true);
    await FamilyApi.getListFamily(activePage - 1, 10, searchRef.current?.value ?? "")
      .then((res) => {
        setListFamily(res.data.items);
        setTotalFamily(res.data.totalItem);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData();
  }, [activePage]);

  useEffect(() => {
    tempBan && open();
  }, [tempBan]);

  useEffect(() => {
    tempUnBan && handlers.open();
  }, [tempUnBan]);

  const handleBanFamily = async (id: string) => {
    await FamilyApi.banFamily(id)
      .then((res) => {
        useToast.success("Cấm gia đình thành công 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleUnBanFamily = async (id: string) => {
    await FamilyApi.unBanFamily(id)
      .then((res) => {
        useToast.success("Bỏ cấm gia đình thành công 🎉");
        fetchData();
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
      <td>
        <Link
          href={`/family/${family.id}`}
          className="hover:text-blue-400 hover:underline transition-all"
        >
          {moment(family.createdAt).format("HH:mm:ss, DD/MM/YYYY")}
        </Link>
      </td>
      <td>{family.email}</td>
      <td>{family.name}</td>
      <td>{family.members.length} tài khoản</td>
      <td className={family.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {family.status ? "Hoạt động" : "Cấm"}
      </td>
      <td className="flex gap-3 relative">
        {family.status ? (
          <button
            className="px-5 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#B30000] text-[#B30000] rounded-full hover:bg-red-200 hover:text-red-900 transition-all"
            onClick={() => setTempBan(family.id)}
          >
            Cấm
          </button>
        ) : (
          <button
            className="px-3 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-200 hover:text-primary-700 transition-all"
            onClick={() => setTempUnBan(family.id)}
          >
            Bỏ cấm
          </button>
        )}
      </td>
    </tr>
  ));

  return (
    <div
      className="bg-white p-6 rounded-lg col-span-3 h-fit w-full"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
        className="w-1/3 flex bg-[#F1F5FE] rounded-full overflow-hidden items-center mb-5"
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Tìm kiếm gia đình bằng email"
          className="w-full bg-transparent focus:outline-none py-3 px-5"
        />
        <IconSearch
          type="submit"
          className="w-16 h-10 text-[#8D92AA] px-5 hover:bg-[#00000010] transition-all cursor-pointer"
          onClick={fetchData}
        />
      </form>
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
      {listFamily.length === 0 ? (
        <div className="w-full items-center text-center">
          <Image src={empty.src} fit="contain" height={200} className=" py-10" />
          <p>Danh sách hiện không có tài khoản gia đình nào để hiển thị </p>
        </div>
      ) : null}
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
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
  );
}
