import botchatImage2 from "@/public/images/botchat_modal_bin.png";
import botchatImage1 from "@/public/images/botchat_modal_happy.png";
import botchatImage0 from "@/public/images/botchat_modal_sad.png";
import { Button, Image, Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function ModalConfirm({
  opened,
  title,
  buttonContent,
  onCancel,
  onOk,
  content,
  image,
}: {
  opened: boolean;
  title: string;
  buttonContent: string;
  onCancel: Function;
  onOk: Function;
  content: string;
  image: number;
}) {
  return (
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
        <div className="w-fill flex justify-center items-center text-center mb-4">
          {image === 0 ? (
            <Image src={botchatImage0.src} width="100px" />
          ) : image === 1 ? (
            <Image src={botchatImage1.src} width="100px" />
          ) : (
            <Image src={botchatImage2.src} width="100px" />
          )}
        </div>
        <p className="text-lg font-bold mb-1 items-center text-center w-full text-primary-900">
          {title}
        </p>
        <p className="text-base font-normal mb-5 items-center text-center w-full text-neutral-600">
          {content}
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="px-5 h-10 hover:!bg-[#66666620] transition-all rounded-full w-full border-primary-500 text-primary-500"
            onClick={() => onCancel()}
          >
            Quay lại
          </Button>
          <Button
            variant="fulled"
            className="px-5 h-10 hover:!bg-primary-700 transition-all bg-primary-500 text-white rounded-full w-full"
            onClick={() => {
              onOk();
              onCancel();
            }}
          >
            {buttonContent}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
