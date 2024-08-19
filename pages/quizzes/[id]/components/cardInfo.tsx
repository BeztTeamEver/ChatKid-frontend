import ModalConfirm from "@/components/common/modal/confirmModal";
import { useToast } from "@/hooks/useToast/toast";
import { QUIZ_TYPE } from "@/types/quiz.type";
import { QuizApi } from "@/utils/quizApi";
import { Button, Image, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function QuizDetailCard({
  quizInfor,
  setQuizInfor,
  opened,
}: {
  quizInfor?: QUIZ_TYPE;
  setQuizInfor: Function;
  opened: Function;
}) {
  const router = useRouter();
  const [tempShow, setTempShow] = useState<string>("");
  const [tempHide, setTempHide] = useState<string>("");
  const [hideOpened, { open, close }] = useDisclosure(false);
  const [showOpened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const handleHideQuiz = async (id: string) => {
    await QuizApi.hideQuiz(id)
      .then((res) => {
        useToast.success("Ẩn bộ câu hỏi thành công 🎉");
        setQuizInfor({ ...quizInfor, status: "UNAVAILABLE" });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleShowQuiz = async (id: string) => {
    await QuizApi.showQuiz(id)
      .then((res) => {
        useToast.success("Hiện bộ câu hỏi thành công 🎉");
        setQuizInfor({ ...quizInfor, status: "AVAILABLE" });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  useEffect(() => {
    tempHide && open();
  }, [tempHide]);

  useEffect(() => {
    tempShow && handlers.open();
  }, [tempShow]);

  return (
    <div className="h-fit w-[560px] bg-none">
      {quizInfor ? (
        <div>
          <div
            className="p-6 rounded-2xl bg-white"
            style={{
              boxShadow:
                "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
            }}
          >
            <div className="w-full h-0 border-[1px] border-neutral-100 relative my-2 ">
              <p className="absolute uppercase bg-white -translate-y-1/2 p-2 text-[#5B607C]">
                Thông tin chung
              </p>
            </div>
            <Image
              src={quizInfor.illustratedImageUrl}
              className="w-full h-[120px] mx-auto my-6 bg-cover bg-center"
              radius="md"
            />
            <div
              className="grid grid-cols-3 gap-3 break-words [&>*:nth-child(odd)]:col-span-1 [&>*:nth-child(odd)]:font-semibold [&>*:nth-child(odd)]:text-[#252937]
            [&>*:nth-child(even)]:col-span-2 [&>*:nth-child(even)]:font-normal [&>*:nth-child(even)]:text-[#464C62]"
            >
              <p>Thời gian tạo</p>
              <p>{moment(quizInfor.createdAt).format("HH:mm:ss, DD/MM/YYYY")}</p>
              <p>Phân loại</p>
              <p>{quizInfor.topic}</p>
              <p>Trạng thái</p>
              <p
                className={quizInfor.status === "AVAILABLE" ? "!text-[#00B300]" : "!text-[#B30000]"}
              >
                {quizInfor.status === "AVAILABLE" ? "Hiện" : "Ẩn"}
              </p>
              <p>Số câu hỏi</p>
              <p>{quizInfor.questions.length}</p>
              <p>Thời gian</p>
              <p>{Number(quizInfor.questionTimeLimit) / 1000} giây/1 câu hỏi</p>
            </div>
            <div className="w-full mt-6 flex gap-3">
              {quizInfor.status === "AVAILABLE" ? (
                <Button
                  leftIcon={<IconEyeOff size={18} />}
                  color="orange"
                  className="w-full py-[5px] font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                  onClick={() => setTempHide(quizInfor.id)}
                >
                  Ẩn
                </Button>
              ) : (
                <Button
                  leftIcon={<IconEye size={18} />}
                  color="orange"
                  className="w-full py-[5px] font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                  onClick={() => setTempShow(quizInfor.id)}
                >
                  Bỏ ẩn
                </Button>
              )}
              <Button
                color="orange"
                leftIcon={<IconTrash size="1rem" />}
                className="w-full py-[5px] font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                onClick={() => opened()}
              >
                Xóa
              </Button>
              <Button
                color="orange"
                leftIcon={<IconEdit size="1rem" />}
                className="w-full py-[5px] font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
                onClick={() => router.push(`/quizzes/update-quiz/${quizInfor.id}`)}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>

          <ModalConfirm
            title="Bạn có muốn ẩn bài viết này?"
            buttonContent="Ẩn"
            opened={hideOpened}
            onOk={() => handleHideQuiz(tempHide)}
            onCancel={close}
            content="Bộ câu hỏi sẽ không thể hiển thị trên ứng dụng KidTalkie sau khi ẩn"
            image={0}
          />
          <ModalConfirm
            title="Bạn có muốn bỏ ẩn bài viết này?"
            buttonContent="Bỏ ẩn"
            content="Bộ câu hỏi sẽ được hiển thị trên ứng dụng KidTalkie sau khi bỏ ẩn"
            opened={showOpened}
            onOk={() => handleShowQuiz(tempShow)}
            onCancel={handlers.close}
            image={1}
          />
        </div>
      ) : (
        <div>
          <Skeleton height={120} radius="md" mb="xl" mx="auto" />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
          <Skeleton height={10} mt={12} width="70%" radius="xl" />
          <br />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
        </div>
      )}
    </div>
  );
}
