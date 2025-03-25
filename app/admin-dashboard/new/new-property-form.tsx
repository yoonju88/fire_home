"use client"

import PropertyForm from '@/components/PropertyForm'
import { useAuth } from "@/context/auth";
import { propertyDataSchema } from '@/validation/propertySchema'
import { z } from "zod"
import { PlusCircleIcon } from 'lucide-react'
import { createProperty } from './action'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewPropertyForm() {
    const auth = useAuth();
    const router = useRouter()

    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken()
        if (!token) { return; }
        const response = await createProperty(data, token)
        if (!!response.error) {
            toast.error("Error!", {
                description: response.message,
            });
            return;
        }
        toast.success("Success!", {
            description: "Property created",
        });
        router.push('/admin-dashboard')
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
