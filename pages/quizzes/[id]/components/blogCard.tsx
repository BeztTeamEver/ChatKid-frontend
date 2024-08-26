import empty from "@/public/images/empty.png";
import { BLOG_TYPE } from "@/types/blog.type";
import { Button, Image } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function BlogCard({ infoBlog }: { infoBlog: BLOG_TYPE }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="w-full h-fit bg-white px-10 py-4 rounded-lg">
      {infoBlog?.content ? (
        <div>
          <div className="flex">
            <h3 className="text-center text-primary-900 text-2xl font-semibold mb-5 w-full">
              {infoBlog.title}
            </h3>
            {/* <Menu shadow="md" width={200}>
              <Menu.Target>
                <IconDotsVertical className="cursor-pointer mx-auto" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconEdit size={18} />}
                  className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
                  onClick={() => router.push(`/quizzes/${id}/update-blog`)}
                >
                  Chỉnh sửa
                </Menu.Item>

                <Menu.Item icon={<IconTrash size={18} />} onClick={() => {}}>
                  Xóa
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </div>
          <Image src={infoBlog.imageUrl} height={120} fit="contain" className="mb-4" />
          <AudioPlayer src={infoBlog.voiceUrl} className="rounded-md mb-5" />
          <div className="text-lg">{parse(infoBlog.content)}</div>
          <div className="flex gap-4 justify-center">
            <Button
              color="orange"
              leftIcon={<IconTrash size="1rem" />}
              className="py-[6px] w-[240px] mt-4 font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
              onClick={() => router.push(`/quizzes/${id}/create-new-blog`)}
            >
              Xóa bài viết
            </Button>
            <Button
              color="orange"
              leftIcon={<IconEdit size="1rem" />}
              className="py-[6px] w-[240px] mt-4 font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
              onClick={() => router.push(`/quizzes/${id}/update-blog`)}
            >
              Chỉnh sửa bài viết
            </Button>
          </div>
        </div>
      ) : (
        <div className="items-center text-center">
          <Image src={empty.src} fit="contain" height={200} className=" py-5" />
          <p className="text-lg font-semibold mt-3">Chưa có bài blog cho bộ câu hỏi</p>
          <p>Bạn có muốn tạo bài blog mới cho bộ câu hỏi này không? </p>
          <Button
            color="orange"
            leftIcon={<IconPlus size="1rem" />}
            className="py-[5px] w-[300px] mt-4 font-semibold bg-[#FFFBF5] border-[1px] border-primary-default text-primary-default rounded-full hover:bg-primary-default hover:text-white transition-all"
            onClick={() => router.push(`/quizzes/${id}/create-new-blog`)}
          >
            Tạo bài viết
          </Button>
        </div>
      )}
    </div>
  );
}
