"use client";

import TableNotification from "@/components/common/table/TableNotification";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CreateNotificationForm = dynamic(() => import("./components/createNotificationForm"), {
  ssr: false,
});

export default function Notification() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleStatus = () => {
    setStatus((state) => !state);
  };

  return isClient ? (
    <div
      className="bg-white p-5 rounded-lg"
      style={{
        boxShadow:
          "0px 6px 12px 0px rgba(78, 41, 20, 0.04), 0px -1px 2px 0px rgba(78, 41, 20, 0.02), 0px 2px 4px 0px rgba(117, 43, 1, 0.04)",
      }}
    >
      <TableNotification status={status} openFunc={open} />
      <Modal opened={opened} onClose={close} withCloseButton={false} size="xl" radius="md" centered>
        <CreateNotificationForm close={close} toggleStatus={toggleStatus} />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
