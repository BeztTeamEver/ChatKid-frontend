"use client";

import TableReport from "@/components/common/table/TableReport";
import { useEffect, useState } from "react";

export default function Notification() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TableReport /> : <></>;
}
