import { QUIZ_TYPE } from "@/types/quiz.type";
import { QuizApi } from "@/utils/quizApi";
import { Breadcrumbs, Skeleton } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import QuizDetailCard from "./components/cardInfo";
import QuestionCard from "./components/questionCard";

export default function DetailQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const [quizInfor, setQuizInfor] = useState<QUIZ_TYPE>();
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      QuizApi.getDetailQuiz(id as string)
        .then((res) => {
          setQuizInfor(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, status]);

  const toggleStatus = () => {
    setStatus((state) => !state);
  };

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
          Chi tiết bộ câu hỏi
        </Link>
      </Breadcrumbs>
      <div className="flex mt-5 gap-5">
        <QuizDetailCard
          quizInfor={quizInfor}
          setQuizInfor={setQuizInfor}
          toggleStatus={toggleStatus}
        />
        <div
          className="w-full h-fit bg-white p-8 rounded-2xl"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
          {quizInfor?.title ? (
            <div>
              <h5 className="text-center text-primary-800 text-xl font-semibold mb-5">
                {quizInfor.title}
              </h5>
              {quizInfor?.questions.map((question, index) => (
                <QuestionCard questionInfor={question} index={index} />
              ))}
            </div>
          ) : (
            <>
              <Skeleton height={20} radius="xl" mb={40} mx="auto" width="30%" />
              <Skeleton height={40} radius="xl" mb={20} width="40%" />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
