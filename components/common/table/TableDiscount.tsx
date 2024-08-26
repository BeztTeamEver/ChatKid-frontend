import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import diamond from "@/public/images/diamond.png";
import empty from "@/public/images/empty.png";
import {
  BODY_CANCEL_DISCOUNT,
  DISCOUNT_TYPE,
  DiscountPackageData,
  DiscountStatusData,
} from "@/types/discount.type";
import { PACKAGE_TYPE } from "@/types/package.type";
import { DiscountApi } from "@/utils/discountApi";
import { PackageApi } from "@/utils/packageApi";
import { ActionIcon, Image, Pagination, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconX } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ModalConfirm from "../modal/confirmModal";
import SkeletonFunction from "../skeleton/skeletonTable";

export default function TableDiscount() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listDiscount, setListDiscount] = useState<Array<DISCOUNT_TYPE>>([]);
  const [listPackage, setListPackage] = useState<Array<PACKAGE_TYPE>>([]);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [packageType, setPackageType] = useState<string>("");
  const [activePage, setActivePage] = useState<number>(1);
  const router = useRouter();
  const [tempCancel, setTempCancel] = useState<string>("");
  const timeNow = new Date();
  const [cancel, setCancel] = useState<BODY_CANCEL_DISCOUNT>({
    status: "INACTIVE",
  });
  const [cancelOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replaceAll("₫", "vnđ");
  };

  const fetchData = async (page: number) => {
    setActivePage(page);
    setIsLoading(true);
    await DiscountApi.getListDiscount(page - 1, 10, packageType, status)
      .then((res) => {
        setListDiscount(res.data.items);
        setTotalDiscount(res.data.totalItem);
      })
      .catch((err) => console.log(err));

    await PackageApi.getListPackage()
      .then((res) => {
        setListPackage(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setTimeout(() => setIsLoading(false), 200);
  };

  useEffect(() => {
    fetchData(1);
  }, [status, packageType]);

  useEffect(() => {
    tempCancel && handlers.open();
  }, [tempCancel]);

  const handleCancelDiscount = async (id: string) => {
    await DiscountApi.cancelDiscount(cancel, id)
      .then((res) => {
        useToast.success("Hủy thành công khuyến mãi 🎉");
        fetchData(activePage);
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const rows = listDiscount.map((discount, index) => (
    <tr
      key={discount.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{moment(discount.startTime).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>{moment(discount.endTime).format("HH:mm:ss, DD/MM/YYYY")}</td>
      <td>{discount.packageName}</td>
      <td>{discount.percent}%</td>
      <td>{formatCurrency(discount.price)}</td>
      <td>{formatCurrency((discount.price / (100 - discount.percent)) * 100)}</td>
      {discount.status === "INACTIVE" ? (
        <td className="font-medium text-red-600">Đã hủy</td>
      ) : moment(discount.endTime) < moment(timeNow) ? (
        <td className="font-medium text-neutral-500">Đã hoàn thành</td>
      ) : moment(discount.startTime) > moment(timeNow) ? (
        <td className="font-medium text-[#67B8FF]">Sắp diễn ra</td>
      ) : (
        <td className="font-medium text-green-600">Đang diễn ra</td>
      )}
      {/* Tác vụ: Đang diễn ra thì có thể hủy khuyến mãi */}
      {discount.status === "INACTIVE" ? (
        <td className="w-[20px]">
          <ActionIcon color="yellow" variant="outline" radius="md" disabled>
            <IconX size="1.125rem" />
          </ActionIcon>
        </td>
      ) : moment(discount.endTime) < moment(timeNow) ? (
        <td className="w-[20px]">
          <ActionIcon color="yellow" variant="outline" radius="md" disabled>
            <IconX size="1.125rem" />
          </ActionIcon>
        </td>
      ) : (
        <td className="w-[20px]">
          <ActionIcon
            color="yellow"
            variant="outline"
            radius="md"
            onClick={() => {
              setTempCancel(discount.id);
            }}
          >
            <IconX size="1.125rem" />
          </ActionIcon>
        </td>
      )}
    </tr>
  ));

  const discountArray = listPackage.map((packageDetail, index) => (
    <div
      className="relative bg-white p-3 rounded-2xl  h-fit w-full flex"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {packageDetail.actualPrice !== packageDetail.price ? (
        <p className="absolute top-0 right-0 font-bold text-primary-700 px-5 py-1 bg-primary-100 rounded-sm rounded-tr-2xl rounded-bl-2xl">
          -{Math.round((1 - packageDetail.actualPrice / packageDetail.price) * 100)}%
        </p>
      ) : (
        <div></div>
      )}
      <Image
        src={packageDetail.thumbnailUrl}
        className="col-span-1 rounded-md mr-3"
        width={150}
        fit="contain"
      />

      <div className="w-full ">
        <p className="font-semibold text-lg mb-0.5">{packageDetail.name}</p>
        <div className="flex items-center mb-0.5">
          <Image src={diamond.src} height={18} width={18} fit="contain" className="mr-1" />
          <p>{packageDetail.diamond}</p>
        </div>
        <div className="text-center rounded-md flex items-center w-fit">
          <div className="bg-primary-500 text-center py-1 pr-4 pl-2 rounded-md flex items-center w-fit">
            <div className="w-[8px] h-[8px] bg-primary-800 rounded-full mr-2.5"></div>
            <p className="text-white font-semibold">{formatCurrency(packageDetail.actualPrice)}</p>
          </div>
          {packageDetail.actualPrice !== packageDetail.price ? (
            <p className=" font-semibold px-2 line-through text-neutral-300">
              {formatCurrency(packageDetail.price)}
            </p>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div
        className="bg-white p-5 rounded-2xl flex h-fit w-full mb-3 justify-items-center"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <p className="text-base font-semibold text-primary-900 mr-6">Danh sách gói khuyến mãi</p>
        <div className="bg-primary-100 p-1 px-4 rounded-2xl flex text-sm">
          <p>Tổng số:</p>
          <p className="mx-2">{totalDiscount}</p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">{discountArray}</div>

      <div
        className="bg-white p-6 rounded-lg col-span-3 h-fit w-full"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <div className="w-full flex justify-between mb-4 items-center ">
          <div className="flex items-center ">
            <Select
              className="mb-1 col-span-3 w-[200px] mr-4"
              value={packageType}
              onChange={(e: string) => setPackageType(e)}
              withAsterisk
              radius={100}
              data={DiscountPackageData}
            />
            <Select
              className="mb-1 col-span-3 w-[200px] mr-4"
              value={status}
              onChange={(e: string) => setStatus(e)}
              withAsterisk
              radius={100}
              data={DiscountStatusData}
            />
            {packageType || status ? (
              <button
                className="w-fit px-2 text-sm font-semibold hover:text-primary-900 text-primary-700 bg-none cursor-pointer"
                onClick={() => {
                  setPackageType("");
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
            className="flex gap-3 items-center bg-primary-default rounded-full px-6 py-1.5 text-white"
            onClick={() => router.push(`/discounts/create-new-discount`)}
          >
            <IconPlus size={18} />
            Tạo gói khuyến mãi mới
          </button>
        </div>
        <Table className="rounded-md overflow-hidden">
          <thead className="bg-primary-default p-[10px]">
            <tr>
              {DataTable.Discount.map((item, index) => (
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
        {listDiscount.length === 0 && !isLoading ? (
          <div className="w-full items-center text-center">
            <Image src={empty.src} fit="contain" height={200} className=" py-10" />
            <p>Danh sách hiện không có khuyến mãi nào phù hợp để hiển thị </p>
          </div>
        ) : null}
        <Pagination
          value={activePage}
          onChange={(e) => fetchData(e)}
          total={Math.ceil(totalDiscount / 10)}
          color="orange"
          className="mt-2 justify-center"
        />
        <ModalConfirm
          title="Bạn có muốn hủy khuyến mãi này?"
          buttonContent="Hủy khuyến mãi"
          opened={cancelOpened}
          onOk={() => handleCancelDiscount(tempCancel)}
          onCancel={handlers.close}
          content="Khuyến mãi sau khi hủy sẽ không thể hoàn tác lại"
          image={0}
        />
      </div>
    </>
  );
}
