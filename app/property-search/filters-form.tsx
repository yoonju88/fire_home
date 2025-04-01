'use client'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    minBedrooms: z.string().optional(),
})

export default function FiltersForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maxPrice: "",
            minPrice: "",
            minBedrooms: "",
        }
    })

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {

    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-4 gap-2"
            >
                <FormField
                    control={form.control}
                    name='minPrice'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Min price"
                                    type="number"
                                    min={0}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='maxPrice'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Max price"
                                    type="number"
                                    min={0}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='minBedrooms'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="minBedrooms"
                                    type="number"
                                    min={0}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="button">
                    Search
                </Button>
            </form>

        </Form>
    )
}
