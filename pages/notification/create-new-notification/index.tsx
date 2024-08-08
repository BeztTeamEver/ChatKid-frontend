import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_NOTIFICATION, DataReceiver } from "@/types/notification.type";
import { NotificationApi } from "@/utils/notificationApi ";
import { Breadcrumbs, Button, MultiSelect, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const MyEditor = dynamic(() => import("@/components/common/CKEditor/CKEditor"), {
  ssr: false,
});

export default function CreateNewNotification() {
  const router = useRouter();
  const [state, setState] = useState<BODY_CREATE_NOTIFICATION>({
    title: "",
    content: "",
    receiver: "",
    scheduleTime: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await NotificationApi.createNotification(state)
      .then((res) => {
        useToast.success("Tạo thông báo thành công 🎉");
        router.back();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <div>
      <Breadcrumbs
        className="bg-white p-6 rounded-2xl w-full"
        sx={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <Link
          href="/notification"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách thông báo
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Tạo thông báo mới
        </Link>
      </Breadcrumbs>
      <div className="flex justify-center mt-8 ">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-2 px-12 py-8 justify-between relative  bg-white rounded-2xl w-2/3"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">Tạo bài viết mới</h2>
          <MultiSelect
            label="Phân loại"
            placeholder="Phụ huynh, Trẻ"
            defaultValue={state.receiver.split(",")}
            onChange={(e) => setState({ ...state, receiver: e.join(",") })}
            withAsterisk
            data={DataReceiver}
          />
          <DateTimePicker
            valueFormat="HH:mm, DD/MM/YYYY"
            defaultValue={state.scheduleTime}
            onChange={(e) => setState({ ...state, scheduleTime: e ?? new Date() })}
            minDate={new Date()}
            label="Ngày nhận"
            placeholder="Date input"
            className="col-span-1"
            required
            withAsterisk
          />
          <TextInput
            type="text"
            label="Tựa đề"
            className="col-span-2"
            placeholder="Tiêu đề thông báo"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            withAsterisk
            required
          />
          <p className="text-sm font-semibold -mb-[4px]">
            Nội dung <span className="text-red-400">*</span>
          </p>
          <div className="col-span-2 [&>.ck-content]:!border-[1px] [&>.ck-content]:!border-[#00000030] [&>.ck-content]:max-h-80 [&>.ck-content]:min-h-[200px]">
            <MyEditor
              state={state.content}
              onChange={(value) => setState({ ...state, content: value })}
            />
          </div>

          <Button
            type="submit"
            color="orange"
            radius="md"
            className="w-fit px-5 col-span-2 mx-auto bg-primary-default text-base"
          >
            Tạo
          </Button>
        </form>
      </div>
    </div>
  );
}
