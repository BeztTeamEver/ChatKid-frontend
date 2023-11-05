"use client";

import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_NOTIFICATION, DataReceiver } from "@/types/notification.type";
import { NotificationApi } from "@/utils/notificationApi ";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const MyEditor = dynamic(() => import("@/components/common/CKEditor/CKEditor"), {
  ssr: false,
});
export default function CreateNotificationForm({
  close,
  toggleStatus,
}: {
  close: Function;
  toggleStatus: Function;
}) {
  const [state, setState] = useState<BODY_CREATE_NOTIFICATION>({
    title: "",
    content: "",
    receiver: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await NotificationApi.createNotification(state)
      .then((res) => {
        useToast.success("Tạo thông báo thành công 🎉");
        close();
        toggleStatus();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 px-5 justify-between relative">
      <IconX
        className="absolute -top-1 -right-1 w-5 h-5 cursor-pointer hover:rotate-90 hover:text-red-500 transition-all"
        onClick={() => close()}
      />
      <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">Tạo bài viết mới</h2>
      <TextInput
        type="text"
        label="Tựa đề"
        placeholder="Tiêu đề thông báo"
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.target.value })}
        withAsterisk
        required
      />
      <MultiSelect
        label="Phân loại"
        placeholder="Admin, Chuyên gia, Phụ huynh"
        defaultValue={state.receiver.split(",")}
        onChange={(e) => setState({ ...state, receiver: e.join(",") })}
        withAsterisk
        data={DataReceiver}
      />
      <p className="text-sm font-semibold -mb-[6px]">
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
        className="w-fit px-5 col-span-2 mx-auto bg-[#FF9B06] text-base"
      >
        Tạo
      </Button>
    </form>
  );
}
