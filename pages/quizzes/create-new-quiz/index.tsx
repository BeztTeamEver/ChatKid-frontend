import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_QUESTION } from "@/types/question.type";
import { BODY_CREATE_QUIZ } from "@/types/quiz.type";
import { uploadApi } from "@/utils/commonApi";
import { QuizApi } from "@/utils/quizApi";
import { TopicApi } from "@/utils/topicApi";
import { Breadcrumbs, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CreateQuestionModal from "./components/createQuestionModal";
import GeneralInformationForm from "./components/generalInformationFomr";
import QuestionCard from "./components/questionCard";
import UpdateQuestionModal from "./components/updateQuestionModal";

export default function CreateNewQuiz() {
  const router = useRouter();
  const [createOpened, handlersC] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [updateOpened, handlersU] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });
  const [topicData, setTopicData] = useState<Array<{ value: string; label: string }>>([]);
  const [tempIndexU, setTempIndexU] = useState<string>("");
  const [question, setQuestion] = useState<BODY_CREATE_QUESTION>({
    text: "",
    answerOptions: ["", "", "", ""],
    correctAnswer: "",
    illustratedImageUrl: "",
    status: "AVAILABLE",
  });
  const [state, setState] = useState<BODY_CREATE_QUIZ>({
    title: "",
    topicId: "",
    questionTimeLimit: 1000,
    illustratedImageUrl: "",
    ageGroup: "",
    questions: [],
  });

  useEffect(() => {
    TopicApi.getListTopic()
      .then((res) => {
        res.data.map((topic, index) => topicData.push({ value: topic.id, label: topic.name }));
        console.log(topicData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteQuestion = async (text: string) => {
    setState({
      ...state,
      questions: state.questions.filter((item) => item.text !== text),
    });
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

  const handleAddQuestion = async () => {
    const illustratedImageUrl = await handleUpload(question.illustratedImageUrl);
    const tempQuestions = state.questions;
    tempQuestions.push({ ...question, illustratedImageUrl });
    setState({ ...state, questions: tempQuestions });
  };

  const handleUpdateQuestion = async () => {
    const tempQuestion = state.questions;
    tempQuestion[tempIndexU] = question;
    setState({ ...state, questions: tempQuestion });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.questions.length === 0) {
      useToast.error("Bạn chưa tạo câu hỏi nào!");
      return;
    }
    if (state.illustratedImageUrl === "") {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }

    const illustratedImageUrl = await handleUpload(state.illustratedImageUrl);
    if (!illustratedImageUrl) {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }
    console.log("DATA QUIZ:", state);
    await QuizApi.createQuiz({ ...state, illustratedImageUrl })
      .then((res) => {
        useToast.success("Tạo loại công việc thành công 🎉");
        router.back();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };
  const rows = state.questions.map((item, index) => (
    <QuestionCard
      question={item}
      index={index}
      handleDeleteQuestion={handleDeleteQuestion}
      setTempIndexU={setTempIndexU}
      opened={handlersU.open}
      setQuestion={setQuestion}
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
        <GeneralInformationForm
          state={state}
          setState={setState}
          topicData={topicData}
        ></GeneralInformationForm>
        <div
          className="bg-white p-6 rounded-2xl col-span-3 h-fit w-full"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
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
              handlersC.open();
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
        onCancel={handlersC.close}
        question={question}
        setQuestion={setQuestion}
      />
      <UpdateQuestionModal
        opened={updateOpened}
        onOk={() => handleUpdateQuestion()}
        onCancel={handlersU.close}
        index={tempIndexU}
        question={question}
        setQuestion={setQuestion}
      ></UpdateQuestionModal>
    </div>
  );
}
