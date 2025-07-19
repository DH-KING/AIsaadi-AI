'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import React from 'react'
import GuestMenu from './guest-menu'
import UserMenu from './user-menu'

interface HeaderProps {
  user: User | null
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { open } = useSidebar()
  return (
    <header
      className={cn(
        'absolute top-0 right-0 p-2 flex justify-between items-center z-10 backdrop-blur lg:backdrop-blur-none bg-background/80 lg:bg-transparent transition-[width] duration-200 ease-linear',
        open ? 'md:w-[calc(100%-var(--sidebar-width))]' : 'md:w-full',
        'w-full'
      )}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          {/* --- التعديل هنا --- */}
          {/* تم تغيير رابط الصورة إلى الشعار الجديد */}
          <img src="https://i.ibb.co/r2nBthst/20250719-091015.png" alt="شعار مساعد الساعدي" className="w-8 h-8 ml-2" />
          <span className="text-lg font-semibold">مساعد الساعدي</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {user ? <UserMenu user={user} /> : <GuestMenu />}
      </div>
    </header>
  )
}

export default Header
