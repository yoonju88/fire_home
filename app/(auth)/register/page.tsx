import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import RegisterForm from './register-form'
import Link from 'next/link'

export default function Register() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    Register
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
            <CardFooter>
                Already have an account ?
                <Link
                    href="/login"
                    className="pl-2 underline hover:text-red-500 hover:no-underline"
                >
                    Log in here
                </Link>
            </CardFooter>
        </Card>
    )
}
