import { useToast } from "@/hooks/useToast/toast";
import { BODY_UPDATE_QUESTION } from "@/types/question.type";
import { BODY_UPDATE_QUIZ } from "@/types/quiz.type";
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

export default function UpdateQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const [tempIdD, setTempIdD] = useState<string>("");
  const [topicData, setTopicData] = useState<Array<{ value: string; label: string }>>([]);
  const [tempIndexU, setTempIndexU] = useState<string>("");
  const [tempIndexC, setTempIndexC] = useState<string>("");
  const [listQuestion, setListQuestion] = useState<Array<BODY_UPDATE_QUESTION>>([]);
  const [createOpened, handlersC] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => setTempIndexC(""),
  });
  const [updateOpened, handlersU] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => setTempIndexU(""),
  });
  const [question, setQuestion] = useState<BODY_UPDATE_QUESTION>({
    id: "",
    text: "",
    answerOptions: ["", "", "", ""],
    correctAnswer: "",
    illustratedImageUrl: "",
    status: "AVAILABLE",
  });
  const [state, setState] = useState<BODY_UPDATE_QUIZ>({
    title: "",
    topicId: "",
    questionTimeLimit: 1000,
    illustratedImageUrl: "",
    ageGroup: "",
    questions: [],
    numberOfCoin: 1,
    status: "AVAILABLE",
  });

  useEffect(() => {
    if (id) {
      TopicApi.getListTopic(0, 1000)
        .then((res) => {
          res.data.items.map((topic, index) =>
            topicData.push({ value: topic.id, label: topic.name }),
          );
        })
        .catch((err) => console.log(err));
      QuizApi.getDetailQuiz(id as string)
        .then((res) => {
          setState({
            ...state,
            topicId: res.data.topicId,
            title: res.data.title,
            questionTimeLimit: res.data.questionTimeLimit,
            illustratedImageUrl: res.data.illustratedImageUrl,
            ageGroup: res.data.ageGroup,
            questions: res.data.questions,
            numberOfCoin: res.data.numberOfCoin,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    const temp = state.questions.filter((item, index) => item.status !== "UNAVAILABLE");
    setListQuestion(temp);
  }, [state.questions.length, tempIndexU, tempIdD]);

  const handleUpload = async (base64): Promise<string> => {
    if (base64.startsWith("http")) return base64;
    console.log("BASE64: ", base64);
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

  const handleDeleteQuestion = async (text: string, idD: string) => {
    if (idD === "") {
      setState({
        ...state,
        questions: state.questions.filter((item) => item.text !== text),
      });
    } else {
      setTempIdD(idD);
      const tempQuestions = state.questions;
      tempQuestions.forEach((item, index) => {
        if (item.id === idD) {
          item.status = "UNAVAILABLE";
        }
      });
      setState({ ...state, questions: tempQuestions });
    }
  };

  const handleAddQuestion = async () => {
    const illustratedImageUrl = await handleUpload(question.illustratedImageUrl);
    const tempQuestions = state.questions;
    tempQuestions.push({ ...question, illustratedImageUrl });
    setTempIndexU("");
    setState({ ...state, questions: tempQuestions });
  };

  const handleUpdateQuestion = async () => {
    console.log("TROI OI:", question);
    const tempQuestion = state.questions;
    tempQuestion[tempIndexU] = question;
    console.log("TROI OI LA TROI:", tempQuestion);
    setState({ ...state, questions: tempQuestion });
    setTempIndexU("");
    console.log("TROI OI LA TROI TROI OI:", state);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (listQuestion.length === 0) {
      useToast.error("Bạn chưa tạo câu hỏi nào!");
      return;
    }
    if (state.illustratedImageUrl === "") {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }

    const tempImageUrl = await handleUpload(state.illustratedImageUrl);
    if (!tempImageUrl) {
      useToast.error("Vui lòng thêm hình ảnh minh họa cho bộ câu hỏi!");
      return;
    }
    // const tempQuestions = state.questions;
    // tempQuestions.forEach((item, index) => {
    //   item.illustratedImageUrl = await handleUpload(item.illustratedImageUrl);
    // });
    if (id && !Array.isArray(id))
      await QuizApi.updateQuiz({ ...state, illustratedImageUrl: tempImageUrl }, id)
        .then((res) => {
          useToast.success("Chỉnh sửa bộ câu hỏi thành công🎉");
          router.back();
        })
        .catch((err) => {
          console.log("SAIIIII:", state);
          console.log(err);
          useToast.error("Đã xảy ra sự cố!!!");
        });
  };

  const rows = listQuestion.map((item, index) =>
    item.status === "AVAILABLE" ? (
      <QuestionCard
        question={item}
        index={index}
        handleDeleteQuestion={handleDeleteQuestion}
        setTempIndexU={setTempIndexU}
        opened={handlersU.open}
        setQuestion={setQuestion}
      ></QuestionCard>
    ) : (
      <></>
    ),
  );

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
        <Link
          href={`/quizzes/${id}`}
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Chi tiết bộ câu hỏi
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chỉnh sửa bộ câu hỏi
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
          {rows}
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
              setTempIndexC("123");
              handlersC.open();
            }}
          >
            Thêm câu hỏi
          </Button>
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
