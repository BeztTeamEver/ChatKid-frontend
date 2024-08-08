import {
  IconUsers,
  IconChartPie,
  IconCoins,
  IconBell,
  IconMessages,
  IconHanger,
  IconListDetails,
  IconMessageCircleQuestion,
} from "@tabler/icons-react";

export const DataNavbar = {
  manageCustomer: [
    { label: "Thống kê", link: "/", icon: IconChartPie },
    { label: "Giao dịch", link: "/transactions", icon: IconCoins },
    { label: "Tài khoản gia đình", link: "/family", icon: IconUsers },
    { label: "Lịch sử hỏi botchat", link: "/histories", icon: IconMessages },
    // { label: "Báo cáo", link: "/reports", icon: IconFlag },
    { label: "Thông báo", link: "/notification", icon: IconBell },
  ],
  manageKidTalkie: [
    // { label: "Gói kim cương", link: "/packages", icon: IconDiamond },
    { label: "Trang bị botchat", link: "/assets", icon: IconHanger },
    { label: "Loại công việc", link: "/task-types", icon: IconListDetails },
    { label: "Quiz", link: "/quizzes", icon: IconMessageCircleQuestion },
  ],
};
