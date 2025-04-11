"use client"
import ContinueWithGoogleButton from '@/components/nav/Continue-with-google';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form';

import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be al least 2 characters"),
    password: z.string().refine((value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(value)
    }, {
        message: 'Password must contain at least 6 caracters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special caracter',
    },
    ),
    passwordConfirm: z.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            message: "Password do not match",
            path: ["passwordConfirm"],
            code: "custom",
        })
    }
})

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        }
    })

    const handleSubmit = async (data: z.infer<typeof formSchema>) => { }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
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
                <Button type="submit">
                    Register
                </Button>
                <div className='text-center mb-4'>or</div>
            </form>
            <ContinueWithGoogleButton />
        </Form>
    )
}
