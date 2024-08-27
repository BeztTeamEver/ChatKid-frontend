import { useToast } from "@/hooks/useToast/toast";
import { AssetTypeData, BODY_CREATE_ASSET } from "@/types/asset.type";
import { AssetApi } from "@/utils/assetApi";
import { uploadApi } from "@/utils/commonApi";
import { Breadcrumbs, Button, Col, FileInput, Image, rem, Select, TextInput } from "@mantine/core";
import { IconPhotoUp, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateNewAsset() {
  const [tempImageUrl, setTempImageUrl] = useState<string | null | undefined>();
  const [tempPreviewImageUrl, setTempPreviewImageUrl] = useState<string | null | undefined>();
  const [fileImageUrl, setFileImageUrl] = useState<File | null | undefined>();
  const [filePreviewImageUrl, setFilePreviewImageUrl] = useState<File | null | undefined>();
  const router = useRouter();
  const [state, setState] = useState<BODY_CREATE_ASSET>({
    name: "",
    imageUrl: null,
    previewImageUrl: null,
    position: 0,
    price: 0,
    type: "",
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

  const handleImageChange = (e, setImage, setFile) => {
    if (e) {
      getBase64(e, setImage);
      setFile(e);
    } else setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await handleUpload(tempImageUrl);
    const previewImageUrl = await handleUpload(tempPreviewImageUrl);

    if (!imageUrl) {
      useToast.error("Tải hình ảnh minh họa không thành công, vui lòng thử lại!!!");
      return;
    }

    if (!previewImageUrl) {
      useToast.error("Tải hình ảnh thực tế không thành công, vui lòng thử lại!!!");
      return;
    }

    await AssetApi.createAsset({ ...state, imageUrl, previewImageUrl })
      .then((res) => {
        useToast.success("Tạo trang bị thành công 🎉");
        router.back();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
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
          href="/assets"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách trang bị
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Tạo trang bị mới
        </Link>
      </Breadcrumbs>
      <div className="flex justify-center mt-8 ">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 px-12 py-8 justify-between relative  bg-white rounded-2xl w-1/2"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">Tạo trang bị mới</h2>
          <TextInput
            className="mb-1 col-span-2"
            type="text"
            label="Tên trang bị"
            placeholder="Đặt tên cho trang bị"
            value={state.name}
            radius={100}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            withAsterisk
            required
          />
          <Select
            className="mb-1"
            label="Loại trang bị"
            placeholder="Chọn loại trang bị"
            value={state.type}
            onChange={(e) => setState({ ...state, type: e ?? "" })}
            withAsterisk
            radius={100}
            data={AssetTypeData}
          />
          <Select
            className="mb-1"
            label="Vị trí của trang bị"
            placeholder="Chọn vị trí cho trang bị"
            value={String(state.position)}
            onChange={(e) => setState({ ...state, position: e ? Number(e) : 0 })}
            withAsterisk
            radius={100}
            data={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          />
          <TextInput
            rightSection={<p className="text-sm text-neutral-400">kim cương</p>}
            rightSectionWidth={100}
            className="mb-1 col-span-2"
            type="number"
            min="0"
            max="100"
            label="Giá trị của trang bị"
            placeholder="Đặt giá trị cho trang bị"
            value={state.price}
            radius={100}
            onChange={(e) => setState({ ...state, price: e.target.valueAsNumber })}
            withAsterisk
            required
          />
          <Col p={0} className="mb-2">
            <FileInput
              //   ref={ref}
              className="mb-2"
              icon={<IconPhotoUp size={rem(20)} />}
              label="Hình ảnh minh họa"
              placeholder="Đăng tải hình ảnh"
              radius={100}
              value={fileImageUrl}
              onChange={(e) => handleImageChange(e, setTempImageUrl, setFileImageUrl)}
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
                    setFileImageUrl(null);
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
              value={filePreviewImageUrl}
              onChange={(e) => handleImageChange(e, setTempPreviewImageUrl, setFilePreviewImageUrl)}
              withAsterisk
              accept="image/png, image/jpeg, image/jpg, image/gif, image/svg"
            />
            {tempPreviewImageUrl && (
              <Col className="mt-3 text-center flex justify-center items-center flex-col">
                <Image
                  src={tempPreviewImageUrl}
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
                    setTempPreviewImageUrl(null);
                    setFilePreviewImageUrl(null);
                  }}
                >
                  Hủy ảnh đã đăng tải
                </Button>
              </Col>
            )}
          </Col>
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
