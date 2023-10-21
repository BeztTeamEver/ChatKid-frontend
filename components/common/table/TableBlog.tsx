import { DataTable } from "@/constants/dataTable";
import { useToast } from "@/hooks/useToast/toast";
import { BLOG_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { Pagination, Table } from "@mantine/core";
import { IconDotsVertical, IconPlus, IconSearch } from "@tabler/icons-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function TableBlog({ openFunc, status }: { openFunc: Function; status: boolean }) {
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
      <td>{blog.type}</td>
      <td>{moment(blog.createdAt).format("HH:mm, DD.MM.YYYY")}</td>
      <td>{blog.createdBy}</td>
      <td>{blog.status ? "Hiện" : "Ẩn"}</td>
      <td className="flex gap-3 relative">
        {blog.status ? (
          <button
            className="px-5 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
            onClick={() => handleHideBlog(blog.id)}
          >
            Ẩn
          </button>
        ) : (
          <button
            className="px-4 pt-[6px] pb-1 text-xs font-semibold bg-[#FFFBF5] border-[1px] border-[#FF9B06] text-[#FF9B06] rounded-full hover:bg-[#FF9B06] hover:text-white transition-all"
            onClick={() => handleShowBlog(blog.id)}
          >
            Hiện
          </button>
        )}
        <IconDotsVertical className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer" />
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
          onClick={() => openFunc()}
        >
          <IconPlus />
          Tạo tài khoản mới
        </button>
      </div>
      <Table className="rounded-md overflow-hidden">
        <thead className="bg-[#FF9B06] p-[10px]">
          <tr>
            {DataTable.Blog.map((item, index) => (
              <th
                key={index}
                className={`!text-white !font-bold !text-base leading-[21.7px] ${
                  index === DataTable.Blog.length - 1 ? "w-32" : ""
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
