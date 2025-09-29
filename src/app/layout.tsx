// import { headers as getHeaders } from 'next/headers.js';
import { Header } from '@/components/menu/header';
import { MobileMenu } from '@/components/menu/mobile-menu';
import './globals.css';

export const metadata = {
  description: 'Тест для ITWEBS',
  title: 'Тест для ITWEBS',

};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className='overflow-x-hidden pb-14 text-foreground bg-gradient-to-r from-[#140c22] to-[#463339]'>
        <Header />
        <main>
          {children}
        </main>
        <MobileMenu />
      </body>
    </html>
  );
}
