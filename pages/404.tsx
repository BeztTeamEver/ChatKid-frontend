import notFound from "@/public/images/404.png";
import { Button, Image } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="p-4 ">
      <Image src={notFound.src} height={440} fit="contain" />
      <div className="w-full flex justify-center mt-4">
        <Button
          leftIcon={<IconArrowBack />}
          variant="fulled"
          className="pl-8 pr-10 h-10 hover:!bg-primary-700 transition-all bg-primary-500 text-white rounded-full w-fit"
          onClick={() => router.push(`/`)}
        >
          Quay lại trang thống kê
        </Button>
      </div>
    </div>
  );
}
