"use client";

import TableAds from "@/components/common/table/TableAds";
import { ADS_FORM_REQUEST } from "@/types/ads.type";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CreateAdsForm = dynamic(() => import("./components/createAdsForm"), {
  ssr: false,
});

export default function Ads() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<ADS_FORM_REQUEST>({
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
      <TableAds openFunc={open} status={status} setTypeModal={setTypeModal} />
      <Modal opened={opened} onClose={close} withCloseButton={false} size="xl" radius="md" centered>
        <CreateAdsForm close={close} toggleStatus={toggleStatus} typeModal={typeModal} />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
