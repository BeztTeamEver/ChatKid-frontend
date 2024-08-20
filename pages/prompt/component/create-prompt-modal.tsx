import { useToast } from "@/hooks/useToast/toast";
import { PromptApi } from "@/utils/promptApi";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function CreatePromptModal({
  opened,
  onCancel,
  onFinish,
}: {
  opened: boolean;
  onCancel: Function;
  onFinish: Function;
}) {
  const [component, setComponent] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();

    PromptApi.createPrompt({
      keyword,
      component,
    })
      .then(() => useToast.success("Tạo prompt thành công"))
      .catch(() => useToast.error("Có lỗi xảy ra. Vui lòng thử lại sau!"))
      .finally(() => onFinish());
  };

  return (
    <Modal
      opened={opened}
      onClose={() => onCancel()}
      withCloseButton={false}
      centered
      radius={24}
      size={740}
      padding={0}
      className="[&_.mantine-jfhix9]:bg-transparent [&_.mantine-jfhix9]:shadow-none ove"
    >
      <div className="p-6 bg-white rounded-2xl w-full">
        <IconX
          className="absolute top-2 right-2 w-10 h-10 p-[7px] rounded-full hover:bg-primary-50 hover:text-primary-500 transition-all cursor-pointer bg-white"
          onClick={() => onCancel()}
        />
        <p className="text-lg font-bold mb-1 items-center text-center w-full text-primary-900">
          Tạo prompt
        </p>
        <form
          onSubmit={handleCreatePrompt}
          className="grid grid-cols-2 gap-2 h-fit mt-2 w-full p-0"
        >
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            label="Câu hỏi"
            placeholder="Đặt câu hỏi"
            value={keyword}
            radius={100}
            onChange={(e) => setKeyword(e.target.value)}
            withAsterisk
            required
          />
          <Textarea
            className="mb-4 col-span-2"
            label="Câu trả lời B"
            placeholder="Đặt tựa đề cho bộ câu hỏi"
            minRows={3}
            radius={8}
            onChange={(e) => setComponent(e.target.value)}
            withAsterisk
            required
          />
          <div className="flex justify-center gap-4 col-span-2">
            <Button
              variant="outline"
              color="orange"
              radius="lg"
              className="px-5 text-base w-32"
              onClick={() => onCancel()}
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              color="orange"
              radius="lg"
              className="px-5 bg-primary-default text-base w-32"
            >
              Tạo
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
