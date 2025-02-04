"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { propertyDataSchema } from '@/validation/propertySchema'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {
    handleSubmitAction: (data: z.infer<typeof propertyDataSchema>) => void;
}

export default function PropertyForm({ handleSubmitAction }: Props) {

    const form = useForm<z.infer<typeof propertyDataSchema>>({
        resolver: zodResolver(propertyDataSchema),
        defaultValues: {
            address1: "",
            address2: "",
            city: "",
            postcode: "",
            price: 0,
            description: "",
            bedrooms: 0,
            bathrooms: 0,
            status: "draft"
        }
    })
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitAction)}>
            <div className="grid grid-cols-2">
                <fieldset>
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
                </fieldset>
            </div>
        </form>
    </Form>
}
