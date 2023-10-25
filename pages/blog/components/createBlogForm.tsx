"use client";

import { useToast } from "@/hooks/useToast/toast";
import { BLOG_FORM_REQUEST, BODY_CREATE_BLOG, LIST_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { uploadApi } from "@/utils/commonApi";
import { Button, FileInput, Select, TextInput, rem } from "@mantine/core";
import { IconPhotoUp, IconUpload, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MyEditor = dynamic(() => import("@/components/common/CKEditor/CKEditor"), {
  ssr: false,
});
export default function CreateBlogForm({
  close,
  toggleStatus,
  typeModal,
}: {
  close: Function;
  toggleStatus: Function;
  typeModal: BLOG_FORM_REQUEST;
}) {
  const { method, data } = typeModal;
  const [state, setState] = useState<BODY_CREATE_BLOG>({
    title: data ? data.title : "",
    content: data ? data.content : "",
    imageUrl: data ? data.imageUrl : "",
    voiceUrl: data ? data.voiceUrl : "",
    typeBlogId: data ? data.typeBlog.id : "",
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [audio, setAudio] = useState<string | ArrayBuffer | null>();
  const [listType, setListType] = useState<Array<LIST_TYPE>>([]);

  useEffect(() => {
    const fetch = async () => {
      await BlogApi.getListTypeBlog()
        .then((res) => {
          setListType(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, []);

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
    let imageUrl = await handleUpload(image);
    let voiceUrl = await handleUpload(audio);

    if (!voiceUrl && method === "UPDATE") voiceUrl = data?.voiceUrl ?? "";
    if (!imageUrl && method === "UPDATE") imageUrl = data?.imageUrl ?? "";

    if (!voiceUrl || !imageUrl) {
      useToast.error("Tải tệp lên không thành công, vui lòng thử lại!!!");
      return;
    }

    switch (method) {
      case "CREATE":
        await BlogApi.createBlog({ ...state, imageUrl, voiceUrl })
          .then((res) => {
            useToast.success("Tạo bài viết thành công 🎉");
            close();
            toggleStatus();
          })
          .catch((err) => {
            console.log(err);
            useToast.error("Đã xảy ra sự cố!!!");
          });
        break;

      case "UPDATE":
        data
          ? await BlogApi.updateBlog(data.id, { ...state, imageUrl, voiceUrl })
              .then((res) => {
                useToast.success("Cập nhật bài viết thành công 🎉");
                close();
                toggleStatus();
              })
              .catch((err) => {
                console.log(err);
                useToast.error("Đã xảy ra sự cố!!!");
              })
          : useToast.error("Đã xảy ra sự cố!!!");
        break;
    }
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

  const handleImageChange = (e) => {
    if (e) getBase64(e, "image");
    else setImage(null);
  };

  const handleAudioChange = (e) => {
    if (e) getBase64(e, "audio");
    else setAudio(null);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 px-5 justify-between relative">
      <IconX
        className="absolute -top-1 -right-1 w-5 h-5 cursor-pointer hover:rotate-90 hover:text-red-500 transition-all"
        onClick={() => close()}
      />
      <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">
        {method === "CREATE" ? "Tạo bài viết mới" : "Cập nhật bài viết"}
      </h2>
      <TextInput
        type="text"
        label="Tựa đề"
        placeholder="Tại sao ..."
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.target.value })}
        withAsterisk
        required
      />
      <Select
        label="Phân loại"
        placeholder="Động vật, Thực vật, ..."
        defaultValue={state.typeBlogId}
        onChange={(e) => setState({ ...state, typeBlogId: e ?? "" })}
        withAsterisk
        data={listType.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
      />
      <FileInput
        label="Hình ảnh"
        placeholder="Hình ảnh xem trước blog"
        icon={<IconPhotoUp size={rem(20)} />}
        onChange={handleImageChange}
        withAsterisk
        accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
      />
      <FileInput
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
      <div className="col-span-2 [&>.ck-content]:!border-[1px] [&>.ck-content]:!border-[#00000030] [&>.ck-content]:max-h-80 [&>.ck-content]:min-h-[200px]">
        <MyEditor state={state} setState={setState} />
      </div>

      <Button
        type="submit"
        color="orange"
        radius="md"
        className="w-fit px-5 col-span-2 mx-auto bg-[#FF9B06] text-base"
      >
        {method === "CREATE" ? "Tạo" : "Cập nhật"}
      </Button>
    </form>
  );
}
