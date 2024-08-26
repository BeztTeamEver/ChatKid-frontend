"use client";

import TablePrompt from "@/components/common/table/TablePrompt";
import { useEffect, useState } from "react";

export default function Asset() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TablePrompt /> : <></>;
}
