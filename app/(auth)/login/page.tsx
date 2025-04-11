import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LoginForm from './login-form'
import Link from 'next/link'

export default function Login() {
    return (
        <div>
            <Card className="w-[500px]">
                <CardHeader >
                    <CardTitle className='text-3xl font-bold'>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter >
                    Don&apos;t have an account ?
                    <Link
                        href="/register"
                        className="pl-2 underline hover:text-red-500 hover:no-underline"
                    >
                        Register here.
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
