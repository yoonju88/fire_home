'use client'
import LoginForm from "@/components/login-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginSuccess } from "./action"

export default function LoginModal() {
    const router = useRouter()

    return (
        <Dialog open onOpenChange={() => {
            router.back();
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        You must be logged in to favourite a property
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <LoginForm onSuccess={async () => {
                        await loginSuccess();
                        router.back();

                    }} />
                </div>
                <DialogFooter className="block">
                    Don&apos;t have an account ?
                    <Link href="/register" className="pl-2 underline hover:no-underline hover:text-red-500">
                        Register here.
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}