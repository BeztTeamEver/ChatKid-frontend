import { Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import moment from "moment";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function ChecklogModal({
  opened,
  title,
  onCancel,
  createdAt,
  mail,
  answer,
  voice,
}: {
  opened: boolean;
  title: string;
  onCancel: Function;
  createdAt: string;
  mail: string;
  answer: string;
  voice: string;
}) {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => onCancel()}
        withCloseButton={false}
        centered
        radius={24}
        size={640}
        padding={24}
        className="[&_.mantine-jfhix9]:bg-transparent [&_.mantine-jfhix9]:shadow-none"
      >
        <div className="m-0.5 p-6 bg-white rounded-2xl">
          <IconX
            className="absolute top-2 right-2 w-10 h-10 p-[7px] rounded-full hover:bg-primary-50 hover:text-primary-500 transition-all cursor-pointer bg-white"
            onClick={() => onCancel()}
          />
          <p className="text-lg font-bold mb-4 items-center text-center w-full text-primary-900">
            {title}
          </p>
          <div
            className="grid grid-cols-7 gap-4 break-words [&>*:nth-child(odd)]:col-span-2 [&>*:nth-child(odd)]:font-semibold [&>*:nth-child(odd)]:text-[#252937]
            [&>*:nth-child(even)]:col-span-5 [&>*:nth-child(even)]:font-normal [&>*:nth-child(even)]:text-[#464C62]"
          >
            <p>Thời gian tạo</p>
            <p>{moment(createdAt).format("HH:mm:ss, DD/MM/YYYY")}</p>
            <p>Mail</p>
            <p>{mail}</p>
            <p>Câu hỏi</p>
            <AudioPlayer src={voice} className="rounded-md mb-5" />
            <p>Câu trả lời</p>
            <p>{answer}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
