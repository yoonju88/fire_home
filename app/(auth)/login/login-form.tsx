
"use client"
import { z } from "zod"
import { userLoginSchema } from "@/validation/userLoginSchema"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import ContinueWithGoogleButton from '@/components/nav/Continue-with-google'
import Link from "next/link"
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export default function LoginForm() {
    const auth = useAuth()
    const router = useRouter()
    const form = useForm<z.infer<typeof userLoginSchema>>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmit = async (data: z.infer<typeof userLoginSchema>) => {
        try {
            await auth?.loginWithEmail(data.email, data.password)
            router.refresh()
        } catch (e: any) {
            //To display type of error 
            toast.error("Error", {
                description: e.code === "auth/invalid-credential" ? "Incorrect credential" : "An error occurred"
            })
        }
    }
    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}

            >
                <fieldset
                    disabled={form.formState.isSubmitting}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="mt-4"
                    >
                        Login
                    </Button>
                    <div>
                        Forgotton your password ?
                        <Link href="#" className="pl-2 underline hover:text-red-500 hover:no-underline">
                            Reset it here.
                        </Link>
                    </div>
                    <div className="text-center pb-5">or</div>
                </fieldset>
            </form>
            <ContinueWithGoogleButton />
        </Form>
    )
}
