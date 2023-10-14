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
    { label: "Dashboard", link: "/", icon: IconChartPie },
    { label: "Giao dịch", link: "/transaction", icon: IconCoins },
    { label: "Gia đình", link: "/family", icon: IconCoins },
    { label: "Chuyên gia tư vấn", link: "/expert", icon: IconHeadset },
    { label: "Admin", link: "/admin", icon: IconDeviceDesktopAnalytics },
    { label: "Lịch sử hoạt động chat bot", link: "/histories", icon: IconMessages },
    { label: "Thông báo", link: "/notification", icon: IconBell },
    { label: "Quảng cáo", link: "/ads", icon: IconAdCircle },
    { label: "Blog", link: "/blog", icon: IconZoomQuestion },
  ],
  manageAccount: [
    {
      label: "Tài khoản Kidtalkie",
      icon: IconUsers,
      link: "/accounts-kidtalkie",
    },
  ],
};
