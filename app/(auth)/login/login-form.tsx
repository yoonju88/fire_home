
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
import { FirebaseError } from "firebase/app";


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
        } catch (e: unknown) {
            let errorMessage = "An error occurred";
            //To display type of error 
            if (e instanceof FirebaseError) {
                // Firebase 에러는 code가 붙는 경우가 있어
                errorMessage = e.code === "auth/invalid-credential"
                    ? "Incorrect credential"
                    : errorMessage;
            }
            toast.error("Error", {
                description: errorMessage,
            });
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
