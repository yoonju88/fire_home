"use client"
import React from 'react'
import { propertyDataSchema } from '@/validation/propertySchema'
import PropertyForm from '@/components/PropertyForm'
import { z } from "zod"

export default function NewPropertyForm() {
    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => { }
    return (
        <div>
            <PropertyForm handleSubmitAction={handleSubmit} />
        </div>
    )
}
