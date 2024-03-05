import { Button, Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function ModalConfirm({
  opened,
  title,
  buttonContent,
  onCancel,
  onOk,
}: {
  opened: boolean;
  title: string;
  buttonContent: string;
  onCancel: Function;
  onOk: Function;
}) {
  return (
    <Modal
      opened={opened}
      onClose={() => onCancel()}
      withCloseButton={false}
      centered
      className="p-1"
    >
      <IconX
        className="absolute top-2 right-2 w-5 h-5 p-[1px] rounded-full hover:bg-[#ff4c4c20] hover:text-red-500 transition-all cursor-pointer"
        onClick={() => onCancel()}
      />
      <p className="text-lg font-semibold mb-5">{title}</p>
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="px-5 h-8 hover:!bg-[#66666620] transition-all"
          color="gray"
          onClick={() => onCancel()}
        >
          Hủy
        </Button>
        <Button
          variant="outline"
          className="px-5 h-8 hover:!bg-[#fac88f2d] transition-all"
          color="orange"
          onClick={() => {
            onOk();
            onCancel();
          }}
        >
          {buttonContent}
        </Button>
      </div>
    </Modal>
  );
}
