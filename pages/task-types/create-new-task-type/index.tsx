import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_TASK_TYPE, DataReceiver } from "@/types/taskType.type";
import { uploadApi } from "@/utils/commonApi";
import { TaskTypeApi } from "@/utils/taskTypeApi";
import { Breadcrumbs, Button, Col, FileInput, Image, rem, Select, TextInput } from "@mantine/core";
import { IconPhotoUp, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function CreateNewTaskType() {
  const router = useRouter();
  const [tempImageUrl, setTempImageUrl] = useState<string | null | undefined>();
  const [tempImageHomeUrl, setTempImageHomeUrl] = useState<string | null | undefined>();
  const [tempQues1, setTempQues1] = useState<string>("");
  const [tempQues2, setTempQues2] = useState<string>("");
  const [tempQues3, setTempQues3] = useState<string>("");
  const [hintQuestions, setHintQuestions] = useState<Array<string>>([]);
  const ref = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<BODY_CREATE_TASK_TYPE>({
    name: "",
    imageUrl: null,
    imageHomeUrl: null,
    hintQuestions: [""],
    taskCategoryId: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await handleUpload(tempImageUrl);
    const imageHomeUrl = await handleUpload(tempImageHomeUrl);

    if (!imageUrl) {
      useToast.error("Tải hình ảnh minh họa không thành công, vui lòng thử lại!!!");
      return;
    }

    if (!imageHomeUrl) {
      useToast.error("Tải hình ảnh thực tế không thành công, vui lòng thử lại!!!");
      return;
    }
    if (tempQues1) {
      hintQuestions.push(tempQues1);
    }
    if (tempQues2) {
      hintQuestions.push(tempQues2);
    }
    if (tempQues3) {
      hintQuestions.push(tempQues3);
    }
    await TaskTypeApi.createTaskType({ ...state, hintQuestions, imageUrl, imageHomeUrl })
      .then((res) => {
        useToast.success("Tạo loại công việc thành công 🎉");
        router.back();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
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
          href="/task-types"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách loại công việc
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Tạo loại công việc mới
        </Link>
      </Breadcrumbs>
      <div className="flex justify-center mt-8 ">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 px-12 py-8 justify-between relative  bg-white rounded-2xl w-1/2"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">
            Tạo loại công việc mới
          </h2>
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            label="Tên loại công việc"
            placeholder="Tiêu đề thông báo"
            value={state.name}
            radius={100}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            withAsterisk
            required
          />
          <Select
            className="mb-1 col-span-2"
            label="Phân loại công việc"
            placeholder="Phân loại công việc"
            value={state.taskCategoryId?.toLowerCase()}
            onChange={(e) => setState({ ...state, taskCategoryId: e ?? "" })}
            withAsterisk
            radius={100}
            data={DataReceiver}
          />
          <Col p={0} className="mb-2">
            <FileInput
              ref={ref}
              className="mb-2"
              icon={<IconPhotoUp size={rem(20)} />}
              label="Hình ảnh minh họa"
              placeholder="Đăng tải hình ảnh"
              radius={100}
              onChange={(e) => handleImageChange(e, setTempImageUrl)}
              withAsterisk
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
            />
            {tempImageUrl && (
              <Col className="mt-3 text-center flex justify-center items-center flex-col">
                <Image
                  src={tempImageUrl}
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
                  onClick={() => {
                    setTempImageUrl(null);
                    console.log("========>", ref.current);
                    if (ref.current)
                      ref.current.innerHTML = `<span class="mantine-FileInput-placeholder mantine-1v32taa">
                          Đăng tải hình ảnh
                        </span>`;
                  }}
                >
                  Hủy ảnh đã đăng tải
                </Button>
              </Col>
            )}
          </Col>
          <Col p={0}>
            <FileInput
              className="mb-2"
              icon={<IconPhotoUp size={rem(20)} />}
              label="Hình ảnh thực tế"
              placeholder="Đăng tải hình ảnh"
              radius={100}
              onChange={(e) => handleImageChange(e, setTempImageHomeUrl)}
              withAsterisk
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
            />
            {tempImageHomeUrl && (
              <Col className="mt-3 text-center flex justify-center items-center flex-col">
                <Image
                  src={tempImageHomeUrl}
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
                  onClick={() => setTempImageHomeUrl(null)}
                >
                  Hủy ảnh đã đăng tải
                </Button>
              </Col>
            )}
          </Col>
          <p className="font-bold text-sm -mb-2">Câu hỏi gợi ý công việc</p>
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            placeholder="Câu hỏi gợi ý 1"
            value={tempQues1}
            radius={100}
            onChange={(e) => setTempQues1(e.target.value)}
            withAsterisk
            required
          />
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            placeholder="Câu hỏi gợi ý 2"
            value={tempQues2}
            radius={100}
            onChange={(e) => setTempQues2(e.target.value)}
            withAsterisk
          />
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            placeholder="Câu hỏi gợi ý 3"
            value={tempQues3}
            radius={100}
            onChange={(e) => setTempQues3(e.target.value)}
            withAsterisk
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
        </form>
      </div>
    </div>
  );
}
