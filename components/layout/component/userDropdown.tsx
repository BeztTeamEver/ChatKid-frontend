import { logout } from "@/redux/features/userSlice";
import { USER_TYPE } from "@/types/user.type";
import { Menu, Avatar } from "@mantine/core";
import { IconUser, IconLogout2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function UserDropdown({ user }: { user: USER_TYPE }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="">
            <p className="text-sm font-medium">{`${user.lastName ?? ""} ${
              user.firstName ?? ""
            }`}</p>
            <p className="text-[#7E84A0] text-xs capitalize">
              {user.role?.split("_").join(" ").toLowerCase()}
            </p>
          </div>
          <Avatar src={user.avatarUrl} className="rounded-full" alt="avatar" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />}>Thông tin cá nhân</Menu.Item>
        <Menu.Item color="red" icon={<IconLogout2 size={14} />} onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
