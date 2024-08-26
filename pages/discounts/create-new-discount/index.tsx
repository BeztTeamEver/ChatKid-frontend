import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_DISCOUNT, DiscountPackageCreateData } from "@/types/discount.type";
import { DiscountApi } from "@/utils/discountApi";
import { Breadcrumbs, Button, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateNewDiscount() {
  const router = useRouter();
  const [state, setState] = useState<BODY_CREATE_DISCOUNT>({
    startTime: new Date(),
    endTime: new Date(),
    percent: 0,
    packageId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await DiscountApi.createDiscount(state)
      .then((res) => {
        useToast.success("Tạo khuyến mãi thành công 🎉");
        router.back();
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
          href="/discounts"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách gói khuyến mãi
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Tạo khuyến mãi
        </Link>
      </Breadcrumbs>
      <div className="flex justify-center mt-8 ">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 px-12 py-8 justify-between relative  bg-white rounded-2xl w-2/3"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <h2 className="text-center font-bold mb-[2px] text-xl col-span-2">Tạo khuyến mãi mới</h2>
          <DateTimePicker
            radius={100}
            valueFormat="HH:mm, DD/MM/YYYY"
            defaultValue={state.startTime}
            onChange={(e) => setState({ ...state, startTime: e ?? new Date() })}
            minDate={new Date()}
            label="Thời gian bắt đầu"
            placeholder="Date input"
            className="col-span-1"
            required
            withAsterisk
          />
          <DateTimePicker
            radius={100}
            valueFormat="HH:mm, DD/MM/YYYY"
            defaultValue={state.endTime}
            onChange={(e) => setState({ ...state, endTime: e ?? new Date() })}
            minDate={new Date()}
            label="Thời gian kết thúc"
            placeholder="Date input"
            className="col-span-1"
            required
            withAsterisk
          />
          <Select
            className="mb-1 col-span-2"
            label="Loại trang bị"
            placeholder="Chọn loại trang bị"
            value={state.packageId}
            onChange={(e) => setState({ ...state, packageId: e ?? "" })}
            withAsterisk
            radius={100}
            data={DiscountPackageCreateData}
          />
          <TextInput
            className="mb-1 col-span-2"
            type="number"
            label="% khuyến mãi"
            placeholder="Đặt tên cho trang bị"
            value={state.percent}
            radius={100}
            min={1}
            max={100}
            onChange={(e) => setState({ ...state, percent: e.target.valueAsNumber })}
            withAsterisk
            required
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
