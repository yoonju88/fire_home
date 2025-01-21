import React from 'react'
import Link from "next/link";
import AuthButtons from "@/components/nav/auth-buttons";
import { HomeIcon } from "lucide-react";

export default function Navigation() {
    return (
        <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between">
            <Link
                href="/"
                className="text-3xl tracking-widest flex font-semibold gap-2 items-center uppercase"
            >
                <HomeIcon />
                <span>
                    Fire Homes
                </span>
            </Link>
            <ul className='flex gap-6 items-center'>
                <li>
                    <Link
                        href="/property-search"
                        className='uppercase tracking-widest hover:underline'
                    >
                        Property search
                    </Link>
                </li>
                <AuthButtons />
            </ul>
        </nav>
    )
}
