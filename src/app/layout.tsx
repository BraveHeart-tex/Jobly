import './globals.css';
import { Inter } from 'next/font/google';
import { ChakraProviders } from './ChakraProviders';
import QueryClientProviders from './QueryClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jobly | Land your dream job',
  description:
    'Jobly is a job tracking app that helps you land your dream job. It offers a simple and intuitive interface to help you keep track of your job applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme={'corporate'}>
      <body className={inter.className}>
        <QueryClientProviders>
          <ChakraProviders>{children}</ChakraProviders>
        </QueryClientProviders>
      </body>
    </html>
  );
}
