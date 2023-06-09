import { FiTrendingUp, FiPhoneCall } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';
import { BsClipboardPlus } from 'react-icons/bs';

const LinkItems = [
  { name: 'Application Stats', href: '/', icon: FiTrendingUp },
  { name: 'Jobs List', href: '/jobs', icon: FiPhoneCall },
  { name: 'Salary Estimations', href: '/salaries', icon: BiDollar },
  { name: 'Add Job Info', href: '/jobs/add', icon: BsClipboardPlus },
];

export default LinkItems;
