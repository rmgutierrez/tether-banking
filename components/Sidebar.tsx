'use client';

import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer';
import PlaidLink from './PlaidLink';

const Sidebar = ({ user }: SiderbarProps) => {
const pathname = usePathname();

  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href="/" className='flex mb-12 cursor-pointer items-center gap-2'>
          <Image
            src="/icons/tether_logo.svg"
            width={100}
            height={100}
            alt="Tether logo"
            className='size-[34px] max-xl:size-24'
          />
          <h1 className='sidebar-logo'>
            Tether
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

          return(
            <Link 
            href={item.route}
            key={item.label}
            className={cn('sidebar-link', {'bg-bank-gradient':isActive})}
            >
              <div className='relative size-6'>
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0' : isActive
                  })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          )
        })}

        <PlaidLink user={user}/>
      </nav>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar