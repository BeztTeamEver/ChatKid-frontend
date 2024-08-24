"use client";

import TableNotification from "@/components/common/table/TableNotification";
import { useEffect, useState } from "react";

export default function Notification() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TableNotification /> : <></>;
}
