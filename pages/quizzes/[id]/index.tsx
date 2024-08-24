import ModalConfirm from "@/components/common/modal/confirmModal";
import { useToast } from "@/hooks/useToast/toast";
import { QUIZ_TYPE } from "@/types/quiz.type";
import { QuizApi } from "@/utils/quizApi";
import { Breadcrumbs, Skeleton, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionCircle } from "@tabler/icons";
import { IconArticle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BlogCard from "./components/blogCard";
import QuizDetailCard from "./components/cardInfo";
import QuestionCard from "./components/questionCard";

export default function DetailQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const [quizInfor, setQuizInfor] = useState<QUIZ_TYPE>();
  const [status, setStatus] = useState<boolean>(false);
  const [deleteOpened, handlersD] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  useEffect(() => {
    if (id) {
      QuizApi.getDetailQuiz(id as string)
        .then((res) => {
          setQuizInfor(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, status]);

  const handleDeleteQuiz = async () => {
    if (id && !Array.isArray(id))
      await QuizApi.deleteQuiz(id)
        .then((res) => {
          useToast.success("Xóa bộ câu hỏi thành công 🎉");
          router.back();
        })
        .catch((err) => {
          console.log(err);
          useToast.error("Đã có lỗi xảy ra!!!!");
        });
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
        <QuizDetailCard quizInfor={quizInfor} setQuizInfor={setQuizInfor} opened={handlersD.open} />

        <div
          className="w-full h-fit bg-white p-8 rounded-2xl"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
          <Tabs defaultValue="quiz" variant="default" color="orange">
            <Tabs.List grow>
              <Tabs.Tab
                value="quiz"
                icon={<IconQuestionCircle size="1.2rem" />}
                className="text-base "
              >
                Bộ câu hỏi
              </Tabs.Tab>
              <Tabs.Tab value="blog" icon={<IconArticle size="1.2rem" />} className="text-base">
                Blog kiến thức
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="quiz" pt="lg">
              {quizInfor?.title ? (
                <div>
                  <h5 className="text-center text-primary-900 text-2xl font-semibold mb-5">
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
            </Tabs.Panel>

            <Tabs.Panel value="blog" pt="xs">
              {quizInfor ? (
                <BlogCard infoBlog={quizInfor.blog} />
              ) : (
                <p> Bạn chưa có bài blog nào</p>
              )}
            </Tabs.Panel>
          </Tabs>
        </div>
        <ModalConfirm
          title="Bạn có muốn xóa bộ câu hỏi này?"
          buttonContent="Xóa"
          opened={deleteOpened}
          onOk={() => handleDeleteQuiz()}
          onCancel={handlersD.close}
          content="Sau khi xóa, bộ câu hỏi sẽ không thể hiển thị trên ứng dụng KidTalkie"
          image={0}
        />
      </div>
    </div>
  );
}
