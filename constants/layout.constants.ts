import {
  IconUsers,
  IconDeviceDesktopAnalytics,
  IconChartPie,
  IconCoins,
  IconAdCircle,
  IconBell,
  IconZoomQuestion,
} from "@tabler/icons-react";

export const DataNavbar = {
  manageKidTalkie: [
    { label: "Dashboard", link: "/", icon: IconChartPie },
    { label: "Quảng cáo", link: "/advertising", icon: IconAdCircle },
    { label: "Giao dịch", link: "/transaction", icon: IconCoins },
    { label: "Blog", link: "/blog", icon: IconZoomQuestion },
    { label: "Thông báo", link: "/notification", icon: IconBell },
    { label: "Gia đình", link: "/family", icon: IconUsers },
    // { label: "Chuyên gia tư vấn", link: "/expert", icon: IconHeadset },
    { label: "Admin", link: "/admin", icon: IconDeviceDesktopAnalytics },
    // { label: "Lịch sử hoạt động", link: "/histories", icon: IconMessages },
  ],
  manageAccount: [
    {
      label: "Tài khoản Kidtalkie",
      icon: IconUsers,
      link: "/accounts-kidtalkie",
    },
  ],
};
