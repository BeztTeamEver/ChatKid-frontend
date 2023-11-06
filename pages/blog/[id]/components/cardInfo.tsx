import { useToast } from "@/hooks/useToast/toast";
import { BLOG_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { BackgroundImage, Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import dynamic from "next/dynamic";

const CreateBlogForm = dynamic(() => import("../../components/createBlogForm"), {
  ssr: false,
});

export default function DetailBlogCard({
  infoBlog,
  setInfoBlog,
  toggleStatus,
}: {
  infoBlog?: BLOG_TYPE;
  setInfoBlog: Function;
  toggleStatus: Function;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleHideBlog = async (id: string) => {
    await BlogApi.hideBlog(id)
      .then((res) => {
        useToast.success("Ẩn bài viết thành công 🎉");
        setInfoBlog({ ...infoBlog, status: 0 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  const handleShowBlog = async (id: string) => {
    await BlogApi.showBlog(id)
      .then((res) => {
        useToast.success("Hiện bài viết thành công 🎉");
        setInfoBlog({ ...infoBlog, status: 1 });
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Đã xảy ra sự cố!!!");
      });
  };

  return (
    <div
      className="h-fit p-8 rounded-lg bg-white w-[500px]"
      style={{
        boxShadow:
          "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
      }}
    >
      {infoBlog ? (
        <div>
          <div className="w-full h-0 border-[1px] border-[#E9EAF2] relative my-2">
            <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
              Thông tin chung
            </p>
          </div>
          <BackgroundImage
            src={infoBlog.imageUrl}
            className="w-[120px] h-[120px] mx-auto my-6"
            radius="md"
          />
          <div
            className="grid grid-cols-5 gap-2 break-words [&>*:nth-child(odd)]:col-span-2 [&>*:nth-child(odd)]:font-semibold [&>*:nth-child(odd)]:text-[#252937]
            [&>*:nth-child(even)]:col-span-3 [&>*:nth-child(even)]:font-normal [&>*:nth-child(even)]:text-[#464C62]"
          >
            <p>Phân loại</p>
            <p>{infoBlog.typeBlog.name}</p>
            <p>Người đăng</p>
            <p>{`${infoBlog.createAdmin.lastName} ${infoBlog.createAdmin.firstName}`}</p>
            <p>Ngày đăng</p>
            <p>{moment(infoBlog.createdAt).format("HH:mm, DD/MM/YYYY")}</p>
            <p>Trạng thái</p>
            <p className={infoBlog.status ? "!text-[#00B300]" : "!text-[#B30000]"}>
              {infoBlog.status ? "Hiện" : "Ẩn"}
            </p>
          </div>
          <div className="w-full mt-6 flex gap-3">
            <button
              className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
              onClick={open}
            >
              Chỉnh sửa
            </button>
            {infoBlog.status ? (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
                onClick={() => handleHideBlog(infoBlog.id)}
              >
                Ẩn
              </button>
            ) : (
              <button
                className="w-full py-[10px] font-bold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
                onClick={() => handleShowBlog(infoBlog.id)}
              >
                Hiện
              </button>
            )}
          </div>
          <Modal
            opened={opened}
            onClose={close}
            withCloseButton={false}
            size="xl"
            radius="md"
            centered
          >
            <CreateBlogForm
              close={close}
              toggleStatus={toggleStatus}
              typeModal={{ method: "UPDATE", data: infoBlog }}
            />
          </Modal>
        </div>
      ) : (
        <div>
          <Skeleton height={120} radius="md" mb="xl" mx="auto" />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
          <Skeleton height={10} mt={12} width="70%" radius="xl" />
          <br />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
          <Skeleton height={10} mt={12} radius="xl" />
        </div>
      )}
    </div>
  );
}
