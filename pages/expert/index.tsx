"use client";

import TableAccountExpert from "@/components/common/table/TableAccountExpert";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import CreateExpertForm from "./components/createExpertForm";

export default function Expert() {
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<boolean>(false);

  const toggleStatus = () => {
    setStatus((state) => !state);
  };

  return (
    <div
      className="bg-white p-5 rounded-lg"
      style={{
        boxShadow:
          "0px 6px 12px 0px rgba(78, 41, 20, 0.04), 0px -1px 2px 0px rgba(78, 41, 20, 0.02), 0px 2px 4px 0px rgba(117, 43, 1, 0.04)",
      }}
    >
      <TableAccountExpert openFunc={open} status={status} />
      <Modal opened={opened} onClose={close} withCloseButton={false} size="lg" radius="md" centered>
        <CreateExpertForm close={close} toggleStatus={toggleStatus} />
      </Modal>
    </div>
  );
}
