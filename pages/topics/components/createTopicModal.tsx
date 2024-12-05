import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_TOPIC } from "@/types/topic.type";
import { TopicApi } from "@/utils/topicApi";
import { Button, Col, FileInput, Image, Modal, rem, TextInput } from "@mantine/core";
import { IconPhotoUp, IconTrash, IconX } from "@tabler/icons-react";

export default function CreateTopicModal({
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
  const handleUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    TopicApi.uploadImage(formData)
      .then((res) => {
        setTopic({ ...topic, imageUrl: res.data.url });
        console.log(res);
        console.log("IMAGE", formData);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.imageUrl === "") {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }
    if (!topic.imageUrl) {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho câu hỏi!");
      return;
    }
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
          Tạo chủ đề
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
            <FileInput
              className="mb-2"
              icon={<IconPhotoUp size={rem(20)} />}
              label="Hình ảnh minh họa"
              placeholder="Đăng tải hình ảnh"
              radius={100}
              onChange={(e) => handleUpload(e)}
              withAsterisk
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
            />
            {topic.imageUrl && (
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
            Tạo
          </Button>
        </form>
      </div>
    </Modal>
  );
}
