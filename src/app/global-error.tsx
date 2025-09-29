'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Section>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 overflow-x-hidden flex flex-col items-center justify-center min-h-screen">
        <h2>Ooopssss... Something went wrong!</h2>
        <div className="space-x-4 mt-4">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button>
            <Home className="mr-2 h-4 w-4" />
            <Link href={'/'}>Go home</Link>
          </Button>
        </div>
      </div>
    </Section>

  )
}
