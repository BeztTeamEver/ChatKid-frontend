"use client";

import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_BLOG, LIST_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { uploadApi } from "@/utils/commonApi";
import { Button, FileInput, Select, TextInput, rem } from "@mantine/core";
import { IconPhotoUp, IconUpload, IconX } from "@tabler/icons-react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateBlogForm({
  close,
  toggleStatus,
}: {
  close: Function;
  toggleStatus: Function;
}) {
  const [state, setState] = useState<BODY_CREATE_BLOG>({
    title: "",
    content: "",
    imageUrl: "",
    voiceUrl: "",
    typeBlogId: "",
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [audio, setAudio] = useState<string | ArrayBuffer | null>();
  const [editorContent, setEditorContent] = useState<EditorState>(EditorState.createEmpty());
  const [listType, setListType] = useState<Array<LIST_TYPE>>([]);

  useEffect(() => {
    BlogApi.getListTypeBlog()
      .then((res) => {
        setListType(res.data);
      })
      .catch((err) => console.log(err));
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
    const content = draftToHtml(convertToRaw(editorContent.getCurrentContent()));
    const imageUrl = await handleUpload(image);
    const voiceUrl = await handleUpload(audio);

    if (!voiceUrl || !imageUrl) {
      useToast.error("Upload file failed please try again!!!");
      return;
    }

    await BlogApi.createBlog({ ...state, imageUrl, voiceUrl, content })
      .then((res) => {
        useToast.success("Create blog successfully 🎉");
        close();
        toggleStatus();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
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
      <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">Tạo bài viết mới</h2>
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
        value={state.typeBlogId}
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
      <Editor
        editorState={editorContent}
        wrapperClassName="demo-wrapper col-span-2 rounded-md"
        editorClassName="demo-editor border-[1px] rounded-md px-2 !h-72 box-border"
        onEditorStateChange={(e) => setEditorContent(e)}
        placeholder="Tại vì như thế này ..."
      />
      <Button
        type="submit"
        color="orange"
        radius="md"
        className="w-fit px-5 col-span-2 mx-auto bg-[#FF9B06] text-base"
      >
        Tạo
      </Button>
    </form>
  );
}
