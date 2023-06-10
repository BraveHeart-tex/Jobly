import '../globals.css';
import { ChakraProviders } from '../ChakraProviders';
import SidebarWithHeader from '../components/Sidebar';

export const metadata = {
  title: 'Jobly | Dashboard',
  description:
    'Dashboard for Jobly where you can manage your jobs applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProviders>
      <SidebarWithHeader>{children}</SidebarWithHeader>
    </ChakraProviders>
  );
}
