import {
  IconUsers,
  IconHeadset,
  IconDeviceDesktopAnalytics,
  IconChartPie,
  IconCoins,
  IconAdCircle,
  IconBell,
  IconZoomQuestion,
  IconMessages,
} from "@tabler/icons-react";

export const DataNavbar = {
  manageKidTalkie: [
    { label: "Thống kê", link: "/statistic", icon: IconChartPie },
    { label: "Lịch sử hoạt động chat bot", link: "/histories", icon: IconMessages },
    { label: "Giao dịch", link: "/transaction", icon: IconCoins },
    { label: "Quảng cáo", link: "/ads", icon: IconAdCircle },
    { label: "Blog", link: "/blog", icon: IconZoomQuestion },
    { label: "Thông báo", link: "/notification", icon: IconBell },
  ],
  manageAccount: [
    {
      label: "Tài khoản Kidtalkie",
      icon: IconUsers,
      link: "/accounts-kidtalkie",
    },
    { label: "Chuyên gia tư vấn", link: "/expert", icon: IconHeadset },
    { label: "Admin", link: "/admin", icon: IconDeviceDesktopAnalytics },
  ],
};
