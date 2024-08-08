"use client";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

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
      HEHE
    </div>
  ) : (
    <></>
  );
}
