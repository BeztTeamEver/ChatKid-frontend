import { BODY_CREATE_QUIZ } from "@/types/quiz.type";
import { Button, Col, FileInput, Image, rem, Select, TextInput } from "@mantine/core";
import { IconPhotoUp, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function GeneralInformationForm({
  state,
  setState,
  topicData,
}: {
  state: BODY_CREATE_QUIZ;
  setState: Function;
  topicData: Array<{ value: string; label: string }>;
}) {
  const router = useRouter();
  // const handleUpload = async (base64): Promise<string> => {
  //   if (!base64) return "";
  //   const blob = await fetch(base64).then((res) => res.blob());
  //   const formData = new FormData();
  //   formData.append("file", blob);

  //   let result = "";
  //   await uploadApi(formData)
  //     .then((res) => {
  //       result = res.data.url;
  //     })
  //     .catch((err) => console.log(err));
  //   return result;
  // };

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setState({ ...state, illustratedImageUrl: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const handleImageChange = (e) => {
    if (e) getBase64(e);
    else setState({ ...state, illustratedImageUrl: "" });
  };
  return (
    <div
      className="grid grid-cols-2 gap-2 h-fit p-8 rounded-2xl bg-white w-[560px]"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
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
        {state.illustratedImageUrl ? (
          <Col className="mt-3 text-center flex justify-center items-center flex-col">
            <p className="text-sm font-bold w-full text-left mb-1">
              Hình ảnh minh họa cho bộ câu hỏi<span className="text-red-400">*</span>
            </p>
            <Image
              src={state.illustratedImageUrl}
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
              onClick={() => setState({ ...state, illustratedImageUrl: "" })}
            >
              Hủy ảnh đã đăng tải
            </Button>
          </Col>
        ) : (
          <FileInput
            className="mb-2"
            icon={<IconPhotoUp size={rem(20)} />}
            label="Hình ảnh minh họa cho bộ câu hỏi"
            placeholder="Đăng tải hình ảnh"
            radius={100}
            onChange={(e) => handleImageChange(e)}
            withAsterisk
            accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
          />
        )}
      </Col>
      <Select
        className="mb-1 col-span-2"
        label="Chủ đề bộ câu hỏi"
        placeholder="Chọn chủ đề bộ câu hỏi"
        value={state.topicId}
        onChange={(e) => setState({ ...state, topicId: e ?? "" })}
        withAsterisk
        radius={100}
        data={topicData}
      />
      <Select
        className="mb-1 col-span-2"
        label="Nhóm độ tuổi"
        placeholder="Chọn nhóm độ tuổi"
        value={state.ageGroup}
        onChange={(e) => setState({ ...state, ageGroup: e ?? "" })}
        withAsterisk
        radius={100}
        data={["6-7", "8-9", ">9"]}
      />
      <TextInput
        className="mb-1 col-span-2"
        type="number"
        label="Số giây để thực hiện 1 câu hỏi"
        placeholder="Đặt tựa đề cho bộ câu hỏi"
        value={state.questionTimeLimit / 1000}
        min={1}
        max={60}
        radius={100}
        onChange={(e) => setState({ ...state, questionTimeLimit: e.target.valueAsNumber * 1000 })}
        withAsterisk
        required
      />
      <Button
        variant="outline"
        color="orange"
        radius="lg"
        className="px-5 text-base"
        onClick={() => router.back()}
      >
        Quay lại
      </Button>
      <Button
        type="submit"
        color="orange"
        radius="lg"
        className="px-5 bg-primary-default text-base"
      >
        Chỉnh sửa
      </Button>
    </div>
  );
}
