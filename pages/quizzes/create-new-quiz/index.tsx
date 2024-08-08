import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_QUESTION } from "@/types/question.type";
import { BODY_CREATE_QUIZ } from "@/types/quiz.type";
import { uploadApi } from "@/utils/commonApi";
import { QuizApi } from "@/utils/quizApi";
import { TopicApi } from "@/utils/topicApi";
import { Breadcrumbs, Button, Col, FileInput, Image, rem, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhotoUp, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CreateQuestionModal from "./components/createQuestionModal";
import QuestionCard from "./components/questionCard";

export default function CreateNewQuiz() {
  const router = useRouter();
  const [createOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [tempIllustratedImageUrl, setTempIllustratedImageUrl] = useState<
    string | null | undefined
  >();
  const [topicData, setTopicData] = useState<Array<{ value: string; label: string }>>([]);
  const [question, setQuestion] = useState<BODY_CREATE_QUESTION>({
    text: "",
    answerOptions: [],
    correctAnswer: "",
    illustratedImageUrl: "",
  });
  const [state, setState] = useState<BODY_CREATE_QUIZ>({
    title: "",
    topicId: "",
    questionTimeLimit: 10,
    illustratedImageUrl: "",
    ageGroup: "",
    questions: [],
  });

  const handleDeleteQuestion = async (text: string) => {
    setState({
      ...state,
      questions: state.questions.filter((item) => item.text !== text),
    });
  };

  const handleAddQuestion = async () => {
    state.questions.push(question);
  };

  function getBase64(file, setImage) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const handleImageChange = (e, setImage) => {
    if (e) getBase64(e, setImage);
    else setImage(null);
  };

  const handleUpload = async (base64): Promise<string> => {
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

  useEffect(() => {
    TopicApi.getListTopic()
      .then((res) => {
        res.data.map((topic, index) => topicData.push({ value: topic.id, label: topic.name }));
        console.log(topicData);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let { illustratedImageUrl } = question;
    if (tempIllustratedImageUrl !== question.illustratedImageUrl) {
      illustratedImageUrl = await handleUpload(tempIllustratedImageUrl);
      await QuizApi.createQuiz({ ...state, illustratedImageUrl })
        .then((res) => {
          useToast.success("Tạo loại công việc thành công 🎉");
          router.back();
        })
        .catch((err) => {
          console.log(err);
          useToast.error("Đã xảy ra sự cố!!!");
        });
    }
  };
  const rows = state.questions.map((item, index) => (
    <QuestionCard
      question={item}
      index={index}
      handleDeleteQuestion={handleDeleteQuestion}
    ></QuestionCard>
  ));

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
          href="/quizzes"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách bộ câu hỏi
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Tạo bộ câu hỏi mới
        </Link>
      </Breadcrumbs>
      <form onSubmit={handleSubmit} className="flex gap-5 h-fit rounded-2xl mx-auto mt-4 w-full">
        <div className="grid grid-cols-2 gap-2 h-fit p-8 rounded-lg bg-white w-[560px]">
          <div className="col-span-2 h-0 border-[1px] border-neutral-100 relative my-0 mb-2">
            <p className="absolute uppercase bg-white top-0 text-sm -translate-y-1/2  text-[#5B607C]">
              Thông tin chung
            </p>
          </div>
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            label="Tựa đề bộ câu hỏi"
            placeholder="Đặt tựa đề cho bộ câu hỏi"
            value={state.title}
            radius={100}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            withAsterisk
            required
          />
          <Col p={0} className="mb-1 col-span-2">
            <FileInput
              className="mb-2"
              icon={<IconPhotoUp size={rem(20)} />}
              label="Hình ảnh minh họa cho bộ câu hỏi"
              placeholder="Đăng tải hình ảnh"
              radius={100}
              onChange={(e) => handleImageChange(e, setTempIllustratedImageUrl)}
              withAsterisk
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
            />
            {tempIllustratedImageUrl && (
              <Col className="mt-3 text-center flex justify-center items-center flex-col">
                <Image
                  src={tempIllustratedImageUrl}
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
                  onClick={() => setTempIllustratedImageUrl(null)}
                >
                  Hủy ảnh đã đăng tải
                </Button>
              </Col>
            )}
          </Col>
          <Select
            className="mb-1 col-span-2"
            label="Thể loại bộ câu hỏi"
            placeholder="Phân loại công việc"
            value={state.topicId}
            onChange={(e) => setState({ ...state, topicId: e ?? "" })}
            withAsterisk
            radius={100}
            data={topicData}
          />
          <Select
            className="mb-1 col-span-2"
            label="Nhóm độ tuổi"
            placeholder="Phân loại công việc"
            value={state.ageGroup}
            onChange={(e) => setState({ ...state, ageGroup: e ?? "" })}
            withAsterisk
            radius={100}
            data={["5-7", "8-10", ">10"]}
          />
          <TextInput
            className="mb-1 col-span-2"
            type="number"
            label="Thời gian thực hiện 1 câu hỏi"
            placeholder="Đặt tựa đề cho bộ câu hỏi"
            value={state.questionTimeLimit}
            min={10}
            max={100}
            radius={100}
            onChange={(e) => setState({ ...state, questionTimeLimit: e.target.valueAsNumber })}
            withAsterisk
            required
          />
          <Button variant="outline" color="orange" radius="lg" className="px-5 text-base">
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
        </div>
        <div className="bg-white p-6 rounded-lg col-span-3 h-fit w-full">
          <div className="col-span-2 h-0 border-[1px] border-neutral-100 relative my-0 mb-2">
            <p className="absolute uppercase bg-white top-0 text-sm -translate-y-1/2  text-[#5B607C]">
              Câu hỏi
            </p>
          </div>
          <Button
            variant="outline"
            color="orange"
            radius="lg"
            className="px-5 text-base w-full my-4"
            onClick={() => {
              setQuestion({
                ...question,
                text: "",
                answerOptions: [],
                correctAnswer: "",
                illustratedImageUrl: "",
              });
              handlers.open();
            }}
          >
            Thêm câu hỏi
          </Button>
          {rows}
        </div>
      </form>
      <CreateQuestionModal
        opened={createOpened}
        onOk={() => handleAddQuestion()}
        onCancel={handlers.close}
        question={question}
        setQuestion={setQuestion}
      />
    </div>
  );
}
