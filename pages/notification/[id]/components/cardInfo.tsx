import { DataReceiver, NOTIFICATION_TYPE } from "@/types/notification.type";
import { Skeleton } from "@mantine/core";
import moment from "moment";

export default function DetailNotificationCard({
  infoNotification,
}: {
  infoNotification?: NOTIFICATION_TYPE;
}) {
  return (
    <div
      className="h-fit p-8 rounded-lg bg-white w-[500px]"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {infoNotification ? (
        <div>
          <div className="w-full h-0 border-[1px] border-[#E9EAF2] relative my-2">
            <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
              Thông tin chung
            </p>
          </div>
          <div
            className="grid grid-cols-3 gap-2 break-words [&>*:nth-child(odd)]:col-span-1 [&>*:nth-child(odd)]:font-semibold [&>*:nth-child(odd)]:text-[#252937]
            [&>*:nth-child(even)]:col-span-2 [&>*:nth-child(even)]:font-normal [&>*:nth-child(even)]:text-[#464C62] mt-10"
          >
            <p>Người đăng</p>
            <p>{infoNotification.creatorEmail}</p>
            <p>Đối tượng</p>
            <p>
              {infoNotification.receiver
                .replace(DataReceiver[0].value, DataReceiver[0].label)
                .replace(DataReceiver[1].value, DataReceiver[1].label)
                .replace(DataReceiver[2].value, DataReceiver[2].label)}
            </p>
            <p>Ngày đăng</p>
            <p>{moment(infoNotification.createdAt).format("HH:mm, DD/MM/YYYY")}</p>
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
