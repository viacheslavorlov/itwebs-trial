import Link from "next/link"
import { Container } from "../ui/container"
import { Section } from "../ui/section"
import { P } from "../ui/typography"
import { menu } from "@/app/config/menu"

export const Header = () => {

    return (<>

        <Section as="header" yPadding="py-3 md:py-6 lg:py-8" className="bg-gradient-to-r from-[#080017] to-[#3d292f] sticky top-0  opacity-95 backdrop-blur-lg z-50">
            <Container as="nav" className="flex justify-center lg:justify-between items-center">
                <Link href="/" >
                    <P size="default" margin={'none'} className="font-black text-center">ITWEBS Task</P>
                </Link>
                <div className="lg:flex gap-4 hidden">
                    {menu.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <P size="default" margin={'none'} className="hover:underline">{item.label}</P>
                        </Link>
                    ))}

                </div>
            </Container>
        </Section>

    </>
    )
}