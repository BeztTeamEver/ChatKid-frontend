"use client";

import { useToast } from "@/hooks/useToast/toast";
import { ADS_FORM_REQUEST, BODY_CREATE_ADS, LIST_TYPE_ADS } from "@/types/ads.type";
import { AdsApi } from "@/utils/adsApi";
import { uploadApi } from "@/utils/commonApi";
import { Button, FileInput, NumberInput, Select, TextInput, rem } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCurrencyDong, IconPhotoUp, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const MyEditor = dynamic(() => import("@/components/common/CKEditor/CKEditor"), {
  ssr: false,
});
export default function CreateAdsForm({
  close,
  toggleStatus,
  typeModal,
}: {
  close: Function;
  toggleStatus: Function;
  typeModal: ADS_FORM_REQUEST;
}) {
  const { method, data } = typeModal;
  const [state, setState] = useState<BODY_CREATE_ADS>({
    title: data ? data.title : "",
    content: data ? data.content : "",
    company: data ? data.company : "",
    companyEmail: data ? data.companyEmail : "",
    startDate: data ? new Date(data.startDate) : new Date(),
    endDate: data ? new Date(data.endDate) : new Date(),
    imageUrl: data ? data.imageUrl : "",
    destinationUrl: data ? data.destinationUrl : "",
    type: data ? data.type?.toLowerCase() : "",
    price: data ? data.price : 0,
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>();

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

    if (!imageUrl && method === "UPDATE") imageUrl = data?.imageUrl ?? "";

    if (!imageUrl) {
      useToast.error("Tải tệp lên không thành công, vui lòng thử lại!!!");
      return;
    }

    switch (method) {
      case "CREATE":
        await AdsApi.createAds({ ...state, imageUrl })
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
          ? await AdsApi.updateAds(data.id, { ...state, imageUrl })
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

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const handleImageChange = (e) => {
    if (e) getBase64(e);
    else setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 px-5 justify-between relative">
      <IconX
        className="absolute -top-1 -right-1 w-5 h-5 cursor-pointer hover:rotate-90 hover:text-red-500 transition-all"
        onClick={() => close()}
      />
      <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">
        {method === "CREATE" ? "Tạo bài quảng cáo mới" : "Cập nhật bài quảng cáo"}
      </h2>
      <TextInput
        type="text"
        label="Tựa đề"
        placeholder="Chiến lược mới cho ..."
        className="col-span-2"
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.target.value })}
        withAsterisk
        required
      />
      <TextInput
        type="text"
        label="Công ty"
        placeholder="Cty TNHH ABC"
        value={state.company}
        onChange={(e) => setState({ ...state, company: e.target.value })}
        withAsterisk
        required
      />
      <TextInput
        type="email"
        label="Email công ty"
        placeholder="example@company.com"
        value={state.companyEmail}
        onChange={(e) => setState({ ...state, companyEmail: e.target.value })}
        withAsterisk
        required
      />
      <DateInput
        valueFormat="DD/MM/YYYY"
        defaultValue={state.startDate}
        label="Ngày bắt đầu"
        placeholder="Date input"
        className="col-span-1"
        readOnly
      />
      <DateInput
        valueFormat="DD/MM/YYYY"
        defaultValue={state.endDate}
        onChange={(e) => setState({ ...state, endDate: e ?? new Date() })}
        label="Ngày kết thúc"
        placeholder="Date input"
        className="col-span-1"
        minDate={state.startDate}
        withAsterisk
        required
      />
      <Select
        label="Phân loại"
        placeholder="Cửa số, trang chủ"
        defaultValue={state.type}
        onChange={(e) => setState({ ...state, type: e ?? "" })}
        withAsterisk
        data={LIST_TYPE_ADS}
        required
      />
      <NumberInput
        type="number"
        label="Giá trị"
        placeholder="8000000"
        defaultValue={state.price}
        onChange={(e) => setState({ ...state, price: e !== "" ? e : 0 })}
        icon={<IconCurrencyDong size={rem(20)} />}
        className="[&>div>input]:pr-9 [&>div>input]:!pl-4 first:[&>div>div]:left-full first:[&>div>div]:-translate-x-full last:[&>div>div]:hidden"
        withAsterisk
        required
      />
      <FileInput
        label="Hình ảnh"
        placeholder="Hình ảnh xem trước quảng cáo"
        icon={<IconPhotoUp size={rem(20)} />}
        onChange={handleImageChange}
        withAsterisk
        accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
      />
      <TextInput
        type="text"
        label="Trang đích đến"
        placeholder="http://example.com"
        value={state.destinationUrl}
        onChange={(e) => setState({ ...state, destinationUrl: e.target.value })}
        withAsterisk
        required
      />
      <p className="text-sm font-semibold -mb-[6px]">
        Nội dung <span className="text-red-400">*</span>
      </p>
      <div className="col-span-2 [&>.ck-content]:!border-[1px] [&>.ck-content]:!border-[#00000030] [&>.ck-content]:max-h-[300px] [&>.ck-content]:min-h-[200px]">
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
        {method === "CREATE" ? "Tạo" : "Cập nhật"}
      </Button>
    </form>
  );
}
