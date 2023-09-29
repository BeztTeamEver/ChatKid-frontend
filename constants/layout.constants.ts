import {
  IconUsers,
  IconMoodKid,
  IconHeadset,
  IconDeviceDesktopAnalytics,
  IconChartPie,
  IconCoins,
  IconAdCircle,
  IconBell,
  IconZoomQuestion,
  IconDatabase,
  IconMessage,
} from "@tabler/icons-react";

export const DataNavbar = {
  manageAccount: [
    {
      label: "Phụ huynh",
      icon: IconUsers,
      initiallyOpened: true,
      links: [
        { label: "Item 1", link: "/" },
        { label: "Item 2", link: "/item2" },
        { label: "Item 3", link: "/item3" },
        { label: "Item 4", link: "/item4" },
      ],
    },
    { label: "Bé", link: "/child", icon: IconMoodKid },
    { label: "Chuyên gia tư vấn", link: "/expert", icon: IconHeadset },
    { label: "Admin", link: "/admin", icon: IconDeviceDesktopAnalytics },
  ],
  manageKidTalkie: [
    { label: "Thống kê", link: "/statistic", icon: IconChartPie },
    { label: "Giao dịch", link: "/transaction", icon: IconCoins },
    { label: "Quảng cáo", link: "/ads", icon: IconAdCircle },
    { label: "Thông báo", link: "/notification", icon: IconBell },
    { label: "1000 câu hỏi vì sao", link: "/1000-why-questions", icon: IconZoomQuestion },
    { label: "Data", link: "/data", icon: IconDatabase },
    { label: "Lịch sử trả lời câu hỏi", link: "/histories", icon: IconMessage },
  ],
};
