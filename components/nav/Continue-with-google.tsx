'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"


export default function ContinueWithGoogleButton() {
    const auth = useAuth()
    const router = useRouter()
    return (
        <Button onClick={async () => {
            await auth?.loginWithGoogle()
            router.refresh()
        }}
            className="w-full"
        >
            Continue with Google
        </Button>
    )
}