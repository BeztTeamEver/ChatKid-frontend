"use client";

import TableTopic from "@/components/common/table/TableTopic";
import { useEffect, useState } from "react";

export default function TaskType() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TableTopic /> : <></>;
}
