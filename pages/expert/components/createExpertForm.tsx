import { useToast } from "@/hooks/useToast/toast";
import { BODY_CREATE_EXPERT } from "@/types/expert.type";
import { ExpertApi } from "@/utils/expertApi";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function CreateExpertForm({
  close,
  toggleStatus,
}: {
  close: Function;
  toggleStatus: Function;
}) {
  const [state, setState] = useState<BODY_CREATE_EXPERT>({
    firstName: "",
    lastName: "",
    gmail: "",
    phone: "",
    age: 0,
    dateOfBirth: new Date(),
    gender: "male",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await ExpertApi.createExpert(state)
      .then((res) => {
        useToast.success("Tạo tài khoản thành công 🎉");
        toggleStatus();
        close();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-2 p-10 pb-5 justify-between relative"
    >
      <IconX
        className="absolute top-0 right-0 cursor-pointer hover:rotate-90 hover:text-red-500 transition-all"
        onClick={() => close()}
      />
      <h2 className="text-center font-bold mb-3 text-xl col-span-2">
        Tạo tài khoản chuyên gia tư vấn
      </h2>
      <TextInput
        type="text"
        label="Họ"
        placeholder="Nguyễn Văn"
        value={state.lastName}
        onChange={(e) => setState({ ...state, lastName: e.target.value })}
        withAsterisk
        required
      />
      <TextInput
        type="text"
        label="Tên"
        placeholder="Toàn"
        value={state.firstName}
        onChange={(e) => setState({ ...state, firstName: e.target.value })}
        withAsterisk
        required
      />
      <TextInput
        type="email"
        label="Email"
        placeholder="abc@example.com"
        className="col-span-2"
        value={state.gmail}
        onChange={(e) => setState({ ...state, gmail: e.target.value })}
        withAsterisk
        required
      />
      <TextInput
        type="text"
        label="Phone"
        className="col-span-1"
        placeholder="0123456789"
        value={state.phone}
        onChange={(e) => setState({ ...state, phone: e.target.value })}
        withAsterisk
        required
      />
      <NumberInput
        type="number"
        label="Age"
        placeholder="18"
        value={state.age}
        onChange={(e) => setState({ ...state, age: e as number })}
        withAsterisk
        required
      />
      <Select
        label="Gender"
        placeholder="Male/Female"
        value={state.gender}
        onChange={(e) => setState({ ...state, gender: e as "male" | "female" })}
        withAsterisk
        data={[
          { value: "male", label: "Name" },
          { value: "female", label: "Nữ" },
        ]}
      />
      <DateInput
        value={state.dateOfBirth}
        onChange={(e) => setState({ ...state, dateOfBirth: e ?? new Date() })}
        label="Date of birth"
        placeholder="Date of birth"
        className="col-span-1"
        withAsterisk
      />
      <Button
        type="submit"
        color="orange"
        radius="md"
        className="w-fit px-5 col-span-2 mx-auto bg-[#FF9B06] mt-5 text-base"
      >
        Tạo
      </Button>
    </form>
  );
}
