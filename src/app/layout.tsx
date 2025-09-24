// import { headers as getHeaders } from 'next/headers.js';
import { Header } from '@/components/menu/header';
import './globals.css';
import { MobileMenu } from '@/components/menu/mobile-menu';

export const metadata = {
  description: 'Тест для ITWEBS',
  title: 'Тест для ITWEBS',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  // const headers = await getHeaders();
  const { children } = props;

  return (
    <html lang="en">
      <body className='overflow-x-hidden'>
        <Header />
        <main>{children}</main>
        <MobileMenu />
      </body>
    </html>
  );
}
