"use client";

import TableDiscount from "@/components/common/table/TableDiscount";
import { useEffect, useState } from "react";

export default function Discount() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <TableDiscount /> : <></>;
}
