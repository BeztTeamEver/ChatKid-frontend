import { QUESTION_TYPE } from "@/types/question.type";
import { Image, Radio } from "@mantine/core";

export default function QuestionCard({
  questionInfor,
  index,
}: {
  questionInfor?: QUESTION_TYPE;
  index: number;
}) {
  return (
    <div className="p-6 rounded-2xl w-full border border-neutral-100 mb-4">
      <p className="font-medium text-lg">
        Câu {index + 1}: {questionInfor?.text}
      </p>
      <Image src={questionInfor?.illustratedImageUrl} width={240} className="m-6 flex-auto" />
      <div className="grid grid-cols-2 gap-2">
        {questionInfor?.answerOptions.map((question) => (
          <div key={index} className="flex items-center">
            <Radio disabled checked={question === questionInfor.correctAnswer} className="mr-2" />
            <p>{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
