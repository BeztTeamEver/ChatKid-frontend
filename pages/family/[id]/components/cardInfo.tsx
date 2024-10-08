import { useToast } from "@/hooks/useToast/toast";
import { FAMILY_TYPE } from "@/types/family.type";
import { FamilyApi } from "@/utils/familyApi";
import { Skeleton } from "@mantine/core";
import moment from "moment";

export default function DetailFamilyCard({
  infoFamily,
  setInfoFamily,
}: {
  infoFamily?: FAMILY_TYPE;
  setInfoFamily: Function;
}) {
  const handleBanFamily = async (id: string) => {
    await FamilyApi.banFamily(id)
      .then((res) => {
        useToast.success("Cám gia đỉnh thành công 🎉");
        setInfoFamily({ ...infoFamily, status: 0 });
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
        setInfoFamily({ ...infoFamily, status: 1 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <div
      className="h-fit p-8 rounded-lg bg-white w-[640px]"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {infoFamily ? (
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
            <p>Tên gia đình</p>
            <p>{infoFamily.name}</p>
            <p>Email</p>
            <p>{infoFamily.email}</p>
            <p>Số thành viên</p>
            <p>{infoFamily.members.length} tài khoản</p>
            <p>Ngày tạo</p>
            <p>{moment(infoFamily.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</p>
            <p>Trạng thái</p>
            <p className={infoFamily.status ? "!text-[#00B300]" : "!text-[#B30000]"}>
              {infoFamily.status ? "Đang hoạt động" : "Cấm"}
            </p>
          </div>
          <div className="w-full mt-6 flex gap-3">
            {infoFamily.status ? (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#B30000] text-[#B30000] rounded-full hover:bg-red-200 hover:text-red-900 transition-all"
                onClick={() => handleBanFamily(infoFamily.id)}
              >
                Cấm hoạt động
              </button>
            ) : (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                onClick={() => handleUnBanFamily(infoFamily.id)}
              >
                Bỏ cấm hoạt động
              </button>
            )}
          </div>
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
