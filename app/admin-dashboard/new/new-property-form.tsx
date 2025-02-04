"use client"
import React from 'react'
import { propertyDataSchema } from '@/validation/propertySchema'
import PropertyForm from '@/components/PropertyForm'
import { z } from "zod"
import { PlusCircleIcon } from 'lucide-react'

export default function NewPropertyForm() {
    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => { console.log({ data }) }

    return (
        <div>
            <PropertyForm
                handleSubmitAction={handleSubmit}
                submitButtonLabel={
                    <>
                        <PlusCircleIcon /> Create Property
                    </>
                }
            />
        </div>
    )
}
