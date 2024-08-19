import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_BLOG } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { uploadApi } from "@/utils/commonApi";
import { Breadcrumbs, Button, FileInput, rem, TextInput } from "@mantine/core";
import { IconPhotoUp, IconUpload } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const MyEditor = dynamic(() => import("@/components/common/CKEditor/CKEditor"), {
  ssr: false,
});

export default function CreateNewBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [audio, setAudio] = useState<string | ArrayBuffer | null>();
  const [state, setState] = useState<BODY_CREATE_BLOG>({
    title: "",
    content: "",
    imageUrl: "",
    voiceUrl: "",
    theme: "",
    quizId: "",
  });
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

  function getBase64(file, type: "image" | "audio") {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (type === "image") setImage(reader.result);
      else setAudio(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await handleUpload(image);
    const voiceUrl = await handleUpload(audio);

    if (!voiceUrl || !imageUrl) {
      useToast.error("Tải tệp lên không thành công, vui lòng thử lại!!!");
      return;
    }
    if (id && !Array.isArray(id)) {
      await BlogApi.createBlog({ ...state, imageUrl, voiceUrl, quizId: id })
        .then((res) => {
          useToast.success("Tạo bài viết thành công 🎉");
          router.back();
        })
        .catch((err) => {
          console.log(err);
          useToast.error("Đã xảy ra sự cố!!!");
        });
    }
  };

  const handleImageChange = (e) => {
    if (e) getBase64(e, "image");
    else setImage(null);
  };

  const handleAudioChange = (e) => {
    if (e) getBase64(e, "audio");
    else setAudio(null);
  };
  return (
    <div className="justify-center ">
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
          Tạo bài viết
        </Link>
      </Breadcrumbs>
      <div className="flex justify-center mt-5">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 px-10 py-5 justify-between relative bg-white w-2/3 rounded-2xl "
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
          <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">Tạo bài viết mới</h2>
          <TextInput
            className="col-span-2"
            radius={100}
            type="text"
            label="Tựa đề"
            placeholder="Tựa đề cho bài blog"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            withAsterisk
            required
          />
          <TextInput
            className="col-span-2"
            radius={100}
            type="text"
            label="Mã màu nền"
            placeholder=""
            value={state.theme}
            onChange={(e) => setState({ ...state, theme: e.target.value })}
            withAsterisk
            required
          />
          <FileInput
            radius={100}
            label="Hình ảnh"
            placeholder="Hình ảnh xem trước blog"
            icon={<IconPhotoUp size={rem(20)} />}
            onChange={handleImageChange}
            withAsterisk
            accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
          />
          <FileInput
            radius={100}
            label="Âm thanh"
            placeholder="Bài đọc của blog"
            icon={<IconUpload size={rem(14)} />}
            onChange={handleAudioChange}
            withAsterisk
            accept="audio/*"
          />
          <p className="text-sm font-semibold -mb-[6px]">
            Nội dung <span className="text-red-400">*</span>
          </p>
          <div className="col-span-2 round-4 [&>.ck-content]:!border-[1px] [&>.ck-content]:!border-[#00000030] [&>.ck-content]:max-h-80 [&>.ck-content]:min-h-[240px]">
            <MyEditor
              state={state.content}
              onChange={(value) => setState({ ...state, content: value })}
            />
          </div>

          <Button
            type="submit"
            color="orange"
            radius="md"
            className="w-fit px-5 col-span-2 mx-auto bg-primary-default text-base"
          >
            Tạo bài viết
          </Button>
        </form>
      </div>
    </div>
  );
}
