import { FiTrendingUp, FiPhoneCall, FiCalendar } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { BsClipboardPlus } from "react-icons/bs";

const LinkItems = [
  { name: "Application Stats", href: "/dashboard", icon: FiTrendingUp },
  { name: "Jobs List", href: "/dashboard/jobs", icon: FiPhoneCall },
  { name: "Planner", href: "/dashboard/planner", icon: FiCalendar },
  { name: "Salary Estimations", href: "/dashboard/salaries", icon: BiDollar },
  { name: "Add Job Info", href: "/dashboard/jobs/add", icon: BsClipboardPlus },
];

export default LinkItems;
