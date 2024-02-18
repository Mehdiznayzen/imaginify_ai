'use client'

import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const Sidebar = () => {
    const pathname = usePathname()


    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link 
                    href={'/'}
                    className="sidebar-log"    
                >
                    <Image
                        width={180}
                        height={28}
                        src={'/assets/images/logo-text.svg'}
                        alt="logo"
                    />
                </Link>
                <nav className="sidebar-nav">
                    {/* If the user signed in */}
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {
                                navLinks.slice(0,6).map((link) => {
                                    const { icon, label, route } = link
                                    const isActive = route === pathname
                                    return (
                                        <li 
                                            className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`} 
                                            key={route}
                                        >
                                            <Link className="sidebar-link" href={route}>
                                                <Image
                                                    src={icon}
                                                    className={`${isActive && 'brightness-200'}`}
                                                    alt="logo_link"
                                                    width={24}
                                                    height={24}
                                                />
                                                { label }
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <ul>
                            {
                                navLinks.slice(6).map((link) => {
                                    const { icon, label, route } = link
                                    const isActive = route === pathname
                                    return (
                                        <li 
                                            className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`} 
                                            key={route}
                                        >
                                            <Link className="sidebar-link" href={route}>
                                                <Image
                                                    src={icon}
                                                    className={`${isActive && 'brightness-200'}`}
                                                    alt="logo_link"
                                                    width={24}
                                                    height={24}
                                                />
                                                { label }
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            <li className="cursor-pointer gap-2 p-4">
                                <UserButton afterSignOutUrl="/" showName />
                            </li>
                        </ul>
                    </SignedIn>

                    {/* If the user signedOut */}
                    <SignedOut>
                        <Button asChild className="button bg-purple-gradient bg-cover">
                            <Link href={'/signin'}>Log In</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar