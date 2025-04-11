'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"


export default function ContinueWithGoogleButton() {
    const auth = useAuth()
    const router = useRouter()
    return (
        <Button
            onClick={async () => {
                //사용자가 임의로 구글 로그인 모달을 닫아도 에러가 뜨지 않음 
                try {
                    await auth?.loginWithGoogle()
                    router.refresh()
                } catch (e) { }
            }}
            className="w-full"
            variant="outline"
        >
            Continue with Google
        </Button>
    )
}