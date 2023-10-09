import { Menu } from "@mantine/core";
import { IconUser, IconBell } from "@tabler/icons-react";

export default function NotiDropdown() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconBell className="cursor-pointer" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />}>Something</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Something</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Something</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Something</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Something</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
