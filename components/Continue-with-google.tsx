'use client'
import React from 'react'
import { Button } from './ui/button'
import { GoogleAuthProvider } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/client'

export default function ContinueWithGoogleButton() {

    return (
        <Button onClick={() => {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
        }}
        >
            Continue with Google
        </Button>
    )
}