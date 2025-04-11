"use client"
import ContinueWithGoogleButton from '@/components/nav/Continue-with-google';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUserSchema } from '@/validation/registerUser';
import React from 'react'
import { useForm } from 'react-hook-form';
import { registerUser } from './action';
import { z } from "zod"
import { toast } from 'sonner';
import { useRouter } from "next/navigation";


export default function RegisterForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof registerUserSchema>>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        }
    })

    const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
        const response = await registerUser(data)

        if (!!response?.error) {
            toast.error("Error", {
                description: response.message,
            })
            return
        }

        toast.success("Success!", {
            description: "Your account was created successfully 👏🏼"
        })
        router.push("/login")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset
                    disabled={form.formState.isSubmitting}
                    className='flex flex-col gap-4'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Your name"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
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
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='passwordConfirm'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password Confirm</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className='mt-2'
                    >
                        Register
                    </Button>
                    <div className='text-center mb-4'>or</div>
                </fieldset>
            </form>
            <ContinueWithGoogleButton />
        </Form>
    )
}
