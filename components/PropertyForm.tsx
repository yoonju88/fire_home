"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { propertySchema } from '@/validation/propertySchema'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import MultiImageUpload, { ImageUpload } from './Multi-image-upload'

type Props = {
    submitButtonLabel: React.ReactNode;
    handleSubmitAction: (data: z.infer<typeof propertySchema>) => void;
    defaultValues?: z.infer<typeof propertySchema>
}

export default function PropertyForm({
    handleSubmitAction,
    submitButtonLabel,
    defaultValues,
}: Props) {
    //defaultValues 객체를 **스프레드 연산자 (...)**로 덮어씌움
    //즉, defaultValues에 값이 있다면 기존 값이 덮어씌워짐 (우선순위: defaultValues > 기본 객체)
    const combinedDefaultValues: z.infer<typeof propertySchema> = {
        ...{
            address1: "",
            address2: "",
            city: "",
            postcode: "",
            price: 0,
            bedrooms: 0,
            bathrooms: 0,
            description: "",
            status: "draft",
            images: [],
        },
        ...defaultValues,
    }

    const form = useForm<z.infer<typeof propertySchema>>({
        resolver: zodResolver(propertySchema),
        defaultValues: combinedDefaultValues,
    })
    console.log("Submit Button Label:", submitButtonLabel);
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitAction)}>
            <div className="grid grid-cols-2 gap-4">
                <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="draft">
                                                    Draft
                                                </SelectItem>
                                                <SelectItem value="for-sale">
                                                    For sale
                                                </SelectItem>
                                                <SelectItem value="withdrawn">
                                                    Withdrawn
                                                </SelectItem>
                                                <SelectItem value="sold">
                                                    Sold
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Aderess Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Aderess Line 2</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </fieldset>
                <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={5} className='resize-none' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </fieldset>
            </div>
            <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <MultiImageUpload
                                onImagesChangeAction={(images: ImageUpload[]) => {
                                    form.setValue("images", images)
                                }}
                                images={field.value}
                                urlFormatter={(image) => {
                                    if (!image.file) {
                                        return `https://firebasestorage.googleapis.com/v0/b/fire-home.appspot.com/o/${encodeURIComponent(image.url)}?alt=media`
                                    }
                                    return image.url
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button
                type="submit"
                className="max-w-md mx-auto mt-4 w-full flex gap-2"
                disabled={form.formState.isSubmitting}
            >
                {submitButtonLabel}
            </Button>
        </form>
    </Form>
}
