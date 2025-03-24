"use client"

import PropertyForm from '@/components/PropertyForm'
import { useAuth } from "@/context/auth";
import { propertyDataSchema } from '@/validation/propertySchema'
import { z } from "zod"
import { PlusCircleIcon } from 'lucide-react'
import { saveNewProperty } from './action'

export default function NewPropertyForm() {
    const auth = useAuth();
    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken()
        if (!token) { return; }
        const response = await saveNewProperty({ ...data, token })
        console.log({ response })
    }
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
