"use client";

import TableBlog from "@/components/common/table/TableBlog";
import { BLOG_FORM_REQUEST } from "@/types/blog.type";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CreateBlogForm = dynamic(() => import("./components/createBlogForm"), {
  ssr: false,
});

export default function Blog() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<BLOG_FORM_REQUEST>({
    method: "CREATE",
    data: null,
  });

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
      <TableBlog openFunc={open} status={status} setTypeModal={setTypeModal} />
      <Modal opened={opened} onClose={close} withCloseButton={false} size="xl" radius="md" centered>
        <CreateBlogForm close={close} toggleStatus={toggleStatus} typeModal={typeModal} />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
