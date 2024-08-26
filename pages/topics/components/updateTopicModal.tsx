import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_TOPIC } from "@/types/topic.type";
import { uploadApi } from "@/utils/commonApi";
import { Button, Col, FileInput, Image, Modal, rem, TextInput } from "@mantine/core";
import { IconPhotoUp, IconTrash, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function UpdateTopicModal({
  opened,
  onCancel,
  onOk,
  topic,
  setTopic,
}: {
  opened: boolean;
  onCancel: Function;
  onOk: Function;
  topic: BODY_CREATE_TOPIC;
  setTopic: Function;
}) {
  const [tempImageUrl, setTempImageUrl] = useState<string | null | undefined>();

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTopic({ ...topic, imageUrl: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const handleImageChange = (e) => {
    if (e) getBase64(e);
    else setTopic({ ...topic, imageUrl: null });
  };

  const handleUpload = async (base64): Promise<string> => {
    if (base64.startsWith("http")) return base64;
    if (!base64) return "";
    const blob = await fetch(base64).then((res) => res.blob());
    const formData = new FormData();
    formData.append("file", blob);

    let result = "";
    await uploadApi(formData)
      .then((res) => {
        result = res.data.url;
      })
      .catch((err) => console.log(err));
    return result;
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.imageUrl === "") {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }
    const imageUrl = await handleUpload(topic.imageUrl);
    if (!imageUrl) {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho câu hỏi!");
      return;
    }
    setTopic({ ...topic, imageUrl });
    console.log("topic.imageUrl=", topic.imageUrl);

    console.log(topic);
    onOk();
    onCancel();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => onCancel()}
      withCloseButton={false}
      centered
      radius={24}
      size={640}
      padding={0}
      className="[&_.mantine-jfhix9]:bg-transparent [&_.mantine-jfhix9]:shadow-none"
    >
      <div className="m-0.5 p-6 bg-white rounded-2xl w-full">
        <IconX
          className="absolute top-2 right-2 w-10 h-10 p-[7px] rounded-full hover:bg-primary-50 hover:text-primary-500 transition-all cursor-pointer bg-white"
          onClick={() => onCancel()}
        />
        <p className="text-lg font-bold mb-1 items-center text-center w-full text-primary-900">
          Cập nhật chủ đề
        </p>
        <form onSubmit={handleCreateTopic} className="grid grid-cols-2 gap-2 h-fit mt-2 w-full p-0">
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            label="Tên chủ đề"
            placeholder="Điền tên câu hỏi"
            value={topic.name}
            radius={100}
            onChange={(e) => setTopic({ ...topic, name: e.target.value })}
            withAsterisk
            required
          />
          <Col p={0} className="mb-1 col-span-2">
            {topic.imageUrl ? (
              <Col className="mt-3 text-center flex justify-center items-center flex-col">
                <Image
                  src={topic.imageUrl}
                  alt="hình ảnh minh họa"
                  height={80}
                  fit="contain"
                  className="border-neutral-100 border p-1 rounded-2xl"
                />
                <Button
                  leftIcon={<IconTrash size={16} />}
                  variant="white"
                  color="orange"
                  className="mt-3 border-primary-500 rounded-full text-xs"
                  onClick={() => setTopic({ ...topic, imageUrl: "" })}
                >
                  Hủy ảnh đã đăng tải
                </Button>
              </Col>
            ) : (
              <FileInput
                className="mb-2"
                icon={<IconPhotoUp size={rem(20)} />}
                label="Hình ảnh minh họa"
                placeholder="Đăng tải hình ảnh"
                radius={100}
                onChange={(e) => handleImageChange(e)}
                withAsterisk
                accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
              />
            )}
          </Col>

          <Button
            variant="outline"
            color="orange"
            radius="lg"
            className="px-5 text-base"
            onClick={() => onCancel()}
          >
            Quay lại
          </Button>
          <Button
            type="submit"
            color="orange"
            radius="lg"
            className="px-5 bg-primary-default text-base"
          >
            Cập nhật
          </Button>
        </form>
      </div>
    </Modal>
  );
}
