import TableQuiz from "@/components/common/table/TableQuiz";
import { useEffect, useState } from "react";

export default function Quiz() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TableQuiz /> : <></>;
}
