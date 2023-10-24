"use client";

import TableAccountAdmin from "@/components/common/table/TableAccountAdmin";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import CreateAdminForm from "./components/createAdminForm";

export default function Admin() {
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
      <TableAccountAdmin status={status} openFunc={open} />
      <Modal opened={opened} onClose={close} withCloseButton={false} radius="md" size="lg" centered>
        <CreateAdminForm close={close} toggleStatus={toggleStatus} />
      </Modal>
    </div>
  );
}
