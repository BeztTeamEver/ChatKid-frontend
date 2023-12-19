import { useToast } from "@/hooks/useToast/toast";
import { ADS_TYPE } from "@/types/ads.type";
import { AdsApi } from "@/utils/adsApi";
import { Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import dynamic from "next/dynamic";

const CreateAdsForm = dynamic(() => import("../../components/createAdsForm"), {
  ssr: false,
});

export default function DetailAdsCard({
  infoAds,
  setInfoAds,
  toggleStatus,
}: {
  infoAds?: ADS_TYPE;
  setInfoAds: Function;
  toggleStatus: Function;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleHideAds = async (id: string) => {
    await AdsApi.hideAds(id)
      .then((res) => {
        useToast.success("Ẩn bài viết thành công 🎉");
        setInfoAds({ ...infoAds, status: 0 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleShowAds = async (id: string) => {
    await AdsApi.showAds(id)
      .then((res) => {
        useToast.success("Hiện bài viết thành công 🎉");
        setInfoAds({ ...infoAds, status: 1 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <div
      className="h-fit p-8 rounded-lg bg-white w-[500px]"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {infoAds ? (
        <div>
          <div className="w-full h-0 border-[1px] border-neutral-100 relative my-2 mb-6">
            <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
              Thông tin chung
            </p>
          </div>
          <div
            className="grid grid-cols-2 gap-2 break-words [&>*:nth-child(odd)]:col-span-1 [&>*:nth-child(odd)]:font-semibold [&>*:nth-child(odd)]:text-[#252937]
            [&>*:nth-child(even)]:col-span-1 [&>*:nth-child(even)]:font-normal [&>*:nth-child(even)]:text-[#464C62]"
          >
            <p>Loại quảng cáo</p>
            <p>{infoAds.type === "popup" ? "Popup" : "Trang chủ"}</p>
            <p>Công ty</p>
            <p>{infoAds.company}</p>
            <p>Email</p>
            <p>{infoAds.companyEmail}</p>
            <p>Ngày đăng</p>
            <p>{moment(infoAds.startDate).format("HH:mm, DD/MM/YYYY")}</p>
            <p>Ngày kết thúc</p>
            <p>{moment(infoAds.endDate).format("HH:mm, DD/MM/YYYY")}</p>
            <p>Lượt bấm</p>
            <p>{infoAds.clicks}</p>
            <p>Giá trị</p>
            <p>{infoAds.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</p>
            <p>Trạng thái</p>
            <p className={infoAds.status ? "!text-[#00B300]" : "!text-[#B30000]"}>
              {infoAds.status ? "Hiện" : "Ẩn"}
            </p>
          </div>
          <div className="w-full mt-6 flex gap-3">
            <button
              className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
              onClick={open}
            >
              Chỉnh sửa
            </button>
            {infoAds.status ? (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                onClick={() => handleHideAds(infoAds.id)}
              >
                Ẩn
              </button>
            ) : (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                onClick={() => handleShowAds(infoAds.id)}
              >
                Hiện
              </button>
            )}
          </div>
          <Modal
            opened={opened}
            onClose={close}
            withCloseButton={false}
            size="xl"
            radius="md"
            centered
          >
            <CreateAdsForm
              close={close}
              toggleStatus={toggleStatus}
              typeModal={{ method: "UPDATE", data: infoAds }}
            />
          </Modal>
        </div>
      ) : (
        <div>
          <Skeleton height={120} radius="md" mb="xl" mx="auto" />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
          <Skeleton height={10} mt={12} width="70%" radius="xl" />
          <br />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
        </div>
      )}
    </div>
  );
}
