import {
  IconUsers,
  IconChartPie,
  IconBell,
  IconMessages,
  IconHanger,
  IconListDetails,
  IconMessageCircleQuestion,
  IconFlag,
  IconDiamond,
  IconBrandOpenai,
} from "@tabler/icons-react";

export const DataNavbar = {
  manageCustomer: [
    { label: "Thống kê", link: "/", icon: IconChartPie },
    { label: "Tài khoản gia đình", link: "/family", icon: IconUsers },
    { label: "Lịch sử hỏi botchat", link: "/histories", icon: IconMessages },
    { label: "Báo cáo", link: "/reports", icon: IconFlag },
    { label: "Prompt", link: "/prompt", icon: IconBrandOpenai },
    { label: "Thông báo", link: "/notification", icon: IconBell },
  ],
  manageKidTalkie: [
    { label: "Gói khuyến mãi", link: "/discounts", icon: IconDiamond },
    { label: "Trang bị botchat", link: "/assets", icon: IconHanger },
    { label: "Loại công việc", link: "/task-types", icon: IconListDetails },
    { label: "Bộ câu hỏi", link: "/quizzes", icon: IconMessageCircleQuestion },
  ],
};
