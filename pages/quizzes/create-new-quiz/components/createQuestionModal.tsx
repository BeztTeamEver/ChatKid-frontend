import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_QUESTION } from "@/types/question.type";
import { QuizApi } from "@/utils/quizApi";
import {
  Button,
  Col,
  FileInput,
  Image,
  Modal,
  rem,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconPhotoUp, IconTrash, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function CreateQuestionModal({
  opened,
  onCancel,
  onOk,
  question,
  setQuestion,
}: {
  opened: boolean;
  onCancel: Function;
  onOk: Function;
  question: BODY_CREATE_QUESTION;
  setQuestion: Function;
}) {
  const [tempCorrectAnswer, setTempCorrectAnswer] = useState<string | null | undefined>();
  const [answerA, setAnswerA] = useState<string>("");
  const [answerB, setAnswerB] = useState<string>("");
  const [answerC, setAnswerC] = useState<string>("");
  const [answerD, setAnswerD] = useState<string>("");

  const handleUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    QuizApi.uploadImage(formData)
      .then((res) => {
        setQuestion({ ...question, illustratedImageUrl: res.data.url });
        console.log(res);
        console.log("IMAGE", formData);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.illustratedImageUrl === "") {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }

    if (!question.illustratedImageUrl) {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho câu hỏi!");
      return;
    }
    console.log("question.illustratedImageUrl=", question.illustratedImageUrl);
    const tempQuestion = question.answerOptions;
    tempQuestion[0] = answerA;
    tempQuestion[1] = answerB;
    tempQuestion[2] = answerC;
    tempQuestion[3] = answerD;
    setQuestion({ ...question, answerOptions: tempQuestion });
    if (tempCorrectAnswer === "A") question.correctAnswer = answerA;
    if (tempCorrectAnswer === "B") question.correctAnswer = answerB;
    if (tempCorrectAnswer === "C") question.correctAnswer = answerC;
    if (tempCorrectAnswer === "D") question.correctAnswer = answerD;
    console.log(question);
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
      size={740}
      padding={0}
      className="[&_.mantine-jfhix9]:bg-transparent [&_.mantine-jfhix9]:shadow-none"
    >
      <div className="m-0.5 p-6 bg-white rounded-2xl w-full">
        <IconX
          className="absolute top-2 right-2 w-10 h-10 p-[7px] rounded-full hover:bg-primary-50 hover:text-primary-500 transition-all cursor-pointer bg-white"
          onClick={() => onCancel()}
        />
        <p className="text-lg font-bold mb-1 items-center text-center w-full text-primary-900">
          Tạo câu hỏi
        </p>
        <form
          onSubmit={handleCreateQuestion}
          className="grid grid-cols-2 gap-2 h-fit mt-2 w-full p-0"
        >
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            label="Câu hỏi"
            placeholder="Đặt câu hỏi"
            value={question.text}
            radius={100}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
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
            {question.illustratedImageUrl && (
              <Col className="mt-3 text-center flex justify-center items-center flex-col">
                <Image
                  src={question.illustratedImageUrl}
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
                  onClick={() => setQuestion({ ...question, illustratedImageUrl: "" })}
                >
                  Hủy ảnh đã đăng tải
                </Button>
              </Col>
            )}
          </Col>
          <Textarea
            className="mb-1"
            label="Câu trả lời A"
            placeholder="Thêm câu trả lời A"
            minRows={3}
            radius={8}
            onChange={(e) => setAnswerA(e.target.value)}
            withAsterisk
            required
          />
          <Textarea
            className="mb-1"
            label="Câu trả lời B"
            placeholder="Thêm câu trả lời B"
            minRows={3}
            radius={8}
            onChange={(e) => setAnswerB(e.target.value)}
            withAsterisk
            required
          />
          <Textarea
            className="mb-1"
            label="Câu trả lời C"
            placeholder="Thêm câu trả lời C"
            minRows={3}
            radius={8}
            onChange={(e) => setAnswerC(e.target.value)}
            withAsterisk
            required
          />
          <Textarea
            className="mb-1"
            label="Câu trả lời D"
            placeholder="Thêm câu trả lời D"
            minRows={3}
            radius={8}
            onChange={(e) => setAnswerD(e.target.value)}
            withAsterisk
            required
          />
          <Select
            className="mb-1 col-span-2"
            label="Đáp án đúng"
            placeholder="Chọn đáp án đúng cho câu hỏi"
            onChange={(e) => setTempCorrectAnswer(e ?? "")}
            withAsterisk
            radius={100}
            data={["A", "B", "C", "D"]}
          />
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
