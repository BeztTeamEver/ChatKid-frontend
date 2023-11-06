import { useToast } from "@/hooks/useToast/toast";
import { EXPERT_TYPE } from "@/types/expert.type";
import { ExpertApi } from "@/utils/expertApi";
import { Avatar, Skeleton } from "@mantine/core";
import moment from "moment";

export default function DetailExpertCard({
  infoExpert,
  setInfoExpert,
}: {
  infoExpert?: EXPERT_TYPE;
  setInfoExpert: Function;
}) {
  const handleRemoveExpert = async (id: string) => {
    await ExpertApi.removeExpert(id)
      .then((res) => {
        useToast.success("Ẩn chuyên gia thành công 🎉");
        setInfoExpert({ ...infoExpert, status: 0 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleUnBanExpert = async (id: string) => {
    await ExpertApi.unbanExpert(id)
      .then((res) => {
        useToast.success("Bỏ cấm chuyên gia thành công 🎉");
        setInfoExpert({ ...infoExpert, status: 1 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <div
      className="p-6 rounded-lg bg-white col-span-1 h-fit w-[500px]"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {infoExpert ? (
        <div>
          <div className="w-full h-0 border-[1px] border-[#E9EAF2] relative my-2">
            <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
              Thông tin cá nhân
            </p>
          </div>
          <Avatar
            src={infoExpert.avatarUrl}
            className="w-[120px] h-[120px] rounded-full mx-auto my-6"
            alt="it's me"
          />
          <div
            className="grid grid-cols-3 gap-2 break-words [&>*:nth-child(odd)]:col-span-1 [&>*:nth-child(odd)]:font-semibold [&>*:nth-child(odd)]:text-[#252937]
            [&>*:nth-child(even)]:col-span-2 [&>*:nth-child(even)]:font-normal [&>*:nth-child(even)]:text-[#464C62]"
          >
            <p>Họ và tên</p>
            <p>{`${infoExpert.lastName} ${infoExpert.firstName}`}</p>
            <p>Email</p>
            <p>{infoExpert.gmail}</p>
            <p>Số điện thoại</p>
            <p>{infoExpert.phone}</p>
            <p>Ngày tạo</p>
            <p>{moment(infoExpert.createdAt).format("HH:mm, DD/MM/YYYY")}</p>
            <p>Giới tính</p>
            <p>{infoExpert.gender === "male" ? "Nam" : "Nữ"}</p>
            <p>Trạng thái</p>
            <p className={infoExpert.status ? "!text-[#00B300]" : "!text-[#B30000]"}>
              {infoExpert.status ? "Hoạt động" : "Cấm"}
            </p>
          </div>
          <div className="w-full mt-6">
            {infoExpert.status ? (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
                onClick={() => handleRemoveExpert(infoExpert.id)}
              >
                Cấm
              </button>
            ) : (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
                onClick={() => handleUnBanExpert(infoExpert.id)}
              >
                Bỏ cấm
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Skeleton height={120} circle mb="xl" mx="auto" />
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
