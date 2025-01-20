import React from 'react'
import Link from 'next/link'


export default function Nav() {
    return (
        <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between ">
            <Link href="/">Fire homes</Link>
            <ul className="flex space-x-3">
                <li>
                    <Link href="/login"> Login</Link>
                </li>
                <li>
                    <Link href="/register">Signup</Link>
                </li>
            </ul>
        </nav>
    )
}
