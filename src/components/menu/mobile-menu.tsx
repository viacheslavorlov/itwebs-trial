import { menu } from "@/app/config/menu"
import Link from "next/link"

export const MobileMenu = () => {
    return (
        <nav className="bg-gradient-to-r from-[#080017] to-[#3d292f] fixed bottom-0 right-0 left-0 lg:hidden flex justify-between px-4 py-4 text-primary-foreground">
            {menu.map(item => (<Link key={item.href} href={item.href}>{<item.icon />}</Link>))}
        </nav>

    )
}