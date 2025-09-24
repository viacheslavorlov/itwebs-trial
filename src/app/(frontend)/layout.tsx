import { getPayload } from 'payload';
import config from '@/payload.config';
import { headers as getHeaders } from 'next/headers.js';
import '../globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });
  const { children } = props;

  return (
    <html lang="en">
      <body>
        {user && (
          <Button variant={'default'} className='' asChild>

            <Link className='fixed bg-accent text-accent-forground animate-pulse right-4 top-4' href={'/admin'}>В CMS</Link>
          </Button>
        )}
        <main>{children}</main>
      </body>
    </html>
  );
}
