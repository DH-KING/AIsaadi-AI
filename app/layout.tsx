import AppSidebar from '@/components/app-sidebar'
import ArtifactRoot from '@/components/artifact/artifact-root'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
// لاستخدام خط عربي جميل (اختياري، لكن موصى به)
import { Cairo } from 'next/font/google'
import './globals.css'

// إعداد الخط العربي
const fontCairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-sans'
})

const title = 'مساعد الساعدي'
const description =
  'محرك إجابات مدعوم بالذكاء الاصطناعي، مفتوح المصدر بالكامل.'

export const metadata: Metadata = {
  // --- التعديل هنا ---
  icons: {
    icon: '/favicon-DH.ico', // تم تغيير مسار الأيقونة هنا
  },
  // --------------------

  // يمكنك تغيير هذا الرابط لاحقًا إلى رابط موقعك النهائي
  metadataBase: new URL('https://vercel.com'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    // تغيير اسم المنشئ إلى اسمك
    creator: 'مساعد الساعدي'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  let user = null
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = await createClient()
    const {
      data: { user: supabaseUser }
    } = await supabase.auth.getUser()
    user = supabaseUser
  }

  return (
    // تغيير اتجاه ولغة الموقع إلى العربية
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen flex flex-col font-sans antialiased',
          // تطبيق الخط العربي
          fontCairo.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen>
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <Header user={user} />
              <main className="flex flex-1 min-h-0">
                <ArtifactRoot>{children}</ArtifactRoot>
              </main>
            </div>
          </SidebarProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
