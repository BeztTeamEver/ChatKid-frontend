import { useToast } from "@/hooks/useToast/toast";
import { ADMIN_TYPE } from "@/types/admin.type";
import { AdminApi } from "@/utils/adminApi";
import { Avatar, Skeleton } from "@mantine/core";
import moment from "moment";

export default function DetailAdminCard({
  infoAdmin,
  setInfoAdmin,
}: {
  infoAdmin?: ADMIN_TYPE;
  setInfoAdmin: Function;
}) {
  const handleRemoveAdmin = async (id: string) => {
    await AdminApi.removeAdmin(id)
      .then((res) => {
        useToast.success("Ẩn admin thành công 🎉");
        setInfoAdmin({ ...infoAdmin, status: 0 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleUnBanAdmin = async (id: string) => {
    await AdminApi.unbanAdmin(id)
      .then((res) => {
        useToast.success("Bỏ cấm admin thành công 🎉");
        setInfoAdmin({ ...infoAdmin, status: 1 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <div
      className="p-6 rounded-lg bg-white w-[400px] mx-auto mt-10"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {infoAdmin ? (
        <div>
          <div className="w-full h-0 border-[1px] border-[#E9EAF2] relative my-2">
            <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
              Thông tin cá nhân
            </p>
          </div>
          <Avatar
            src={infoAdmin.avatarUrl}
            className="w-[120px] h-[120px] rounded-full mx-auto my-6"
            alt="it's me"
          />
          <div className="flex gap-5">
            <div className="w-fit flex gap-3 flex-col [&>p]:text-[#252937] [&>p]:font-semibold">
              <p>Họ và tên</p>
              <p>Email</p>
              <p>Số điện thoại</p>
              <p>Ngày tạo</p>
              <p>Giới tính</p>
              <p>Trạng thái</p>
            </div>
            <div className="w-fit flex gap-3 flex-col [&>p]:text-[#464C62] [&>p]:font-normal">
              <p>{`${infoAdmin.lastName} ${infoAdmin.firstName}`}</p>
              <p>{infoAdmin.gmail}</p>
              <p>{infoAdmin.phone}</p>
              <p>{moment(infoAdmin.createdAt).format("HH:mm, DD/MM/YYYY")}</p>
              <p>{infoAdmin.gender === "male" ? "Nam" : "Nữ"}</p>
              <p className={infoAdmin.status ? "!text-[#00B300]" : "!text-[#B30000]"}>
                {infoAdmin.status ? "Hoạt động" : "Cấm"}
              </p>
            </div>
          </div>
          <div className="w-full mt-6">
            {infoAdmin.status ? (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
                onClick={() => handleRemoveAdmin(infoAdmin.id)}
              >
                Cấm
              </button>
            ) : (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
                onClick={() => handleUnBanAdmin(infoAdmin.id)}
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
