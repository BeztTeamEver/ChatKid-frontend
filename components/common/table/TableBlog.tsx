import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { BLOG_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { Menu, Pagination, Table } from "@mantine/core";
import {
  IconEdit,
  IconEyeOff,
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconEye,
  IconInfoCircle,
} from "@tabler/icons-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function TableBlog({
  openFunc,
  status,
  setTypeModal,
}: {
  openFunc: Function;
  status: boolean;
  setTypeModal: Function;
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [listBlog, setListBlog] = useState<Array<BLOG_TYPE>>([]);
  const [search, setSearch] = useState<String>("");
  const [totalBlog, setTotalBlog] = useState<number>(0);

  const fetchData = () => {
    BlogApi.getListBlog(activePage - 1, 10, search)
      .then((res) => {
        setListBlog(res.data.items);
        setTotalBlog(res.data.totalItem);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [activePage, status]);

  const handleHideBlog = async (id: string) => {
    await BlogApi.hideBlog(id)
      .then((res) => {
        useToast.success("Hide blog successfully 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
  };

  const handleShowBlog = async (id: string) => {
    await BlogApi.showBlog(id)
      .then((res) => {
        useToast.success("Un-ban blog successfully 🎉");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        useToast.error("Something went wrong!!!");
      });
  };

  const rows = listBlog.map((blog, index) => (
    <tr
      key={blog.id}
      className={
        index % 2 === 1
          ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
      }
    >
      <td>{index + 1 + 10 * (activePage - 1)}</td>
      <td>{blog.title}</td>
      <td>{blog.typeBlog.name}</td>
      <td>{moment(blog.createdAt).format("HH:mm, DD.MM.YYYY")}</td>
      <td>{`${blog.createAdmin.lastName} ${blog.createAdmin.firstName}`}</td>
      <td className={blog.status ? "text-[#00B300]" : "text-[#B30000]"}>
        {blog.status ? "Hiện" : "Ẩn"}
      </td>
      <td className="">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical className="cursor-pointer mx-auto" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconInfoCircle size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
            >
              Chi tiết
            </Menu.Item>
            <Menu.Item
              icon={<IconEdit size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => {
                setTypeModal({ method: "UPDATE", data: blog });
                openFunc();
              }}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              icon={blog.status ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
              onClick={() => (blog.status ? handleHideBlog(blog.id) : handleShowBlog(blog.id))}
            >
              {blog.status ? "Ẩn" : "Hiện"}
            </Menu.Item>
            {/* TODO: fix this feature
            <Menu.Item
              icon={<IconTrash size={18} />}
              className="hover:bg-[#FFEDD1] hover:text-[#752B01]"
            >
              Xóa
            </Menu.Item> */}
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="w-full flex justify-between mb-4 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
          className="w-1/3 flex bg-[#F1F5FE] rounded-full overflow-hidden items-center"
        >
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản"
            className="w-full bg-transparent focus:outline-none py-3 px-5"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconSearch
            type="submit"
            className="w-16 h-10 text-[#8D92AA] px-5 hover:bg-[#00000010] transition-all cursor-pointer"
            onClick={fetchData}
          />
        </form>
        <button
          className="flex gap-3 items-center bg-[#FF9B06] rounded-full px-6 py-2 text-white"
          onClick={() => {
            setTypeModal({ method: "CREATE", data: null });
            openFunc();
          }}
        >
          <IconPlus />
          Tạo bài blog mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.Blog.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.Blog.length - 1 ? "w-20" : ""
                }`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={(e) => setActivePage(e)}
        total={Math.ceil(totalBlog / 10)}
        color="orange"
        className="mt-2 justify-center"
      />
    </div>
  );
}
