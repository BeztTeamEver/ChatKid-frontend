import { QUESTION_TYPE } from "@/types/question.type";
import { Image, Menu, Radio } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";

export default function QuestionCard({
  question,
  index,
  handleDeleteQuestion,
  setTempIndexU,
  opened,
  setQuestion,
}: {
  question: QUESTION_TYPE;
  index: number;
  handleDeleteQuestion: Function;
  setTempIndexU: Function;
  opened: Function;
  setQuestion: Function;
}) {
  return (
    <div className="p-6 rounded-2xl w-full border border-neutral-100 mb-4 justify-center items-center">
      <div className="flex">
        <p className="font-medium text-lg w-full">
          Câu {index + 1}: {question?.text}
        </p>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical className="cursor-pointer mx-auto" />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                setQuestion(question);
                setTempIndexU(index);
                opened();
              }}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => handleDeleteQuestion(question.text)}
            >
              Xóa
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Image src={question.illustratedImageUrl} width={180} className="m-6 bg-red-200" />
      <div className="grid grid-cols-2 gap-2">
        {question?.answerOptions.map((answer) => (
          <div key={index} className="flex items-center">
            <Radio disabled checked={answer === question.correctAnswer} className="mr-2" />
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
