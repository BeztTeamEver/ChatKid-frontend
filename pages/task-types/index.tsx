"use client";

import TableTaskType from "@/components/common/table/TableTaskType";
import { useEffect, useState } from "react";

export default function TaskType() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TableTaskType /> : <></>;
}
