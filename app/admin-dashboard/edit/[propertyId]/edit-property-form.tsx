"use client"

import PropertyForm from "@/components/PropertyForm";
import { Property } from "@/types/property"
import { propertyDataSchema } from "@/validation/propertySchema";
import { z } from "zod"

type Props = Property;

export default function EditPropertyForm({
    id,
    address1,
    address2,
    city,
    postcode,
    price,
    bedrooms,
    bathrooms,
    description,
    status,
}: Props) {
    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => { }
    return (
        <div>
            <PropertyForm
                handleSubmitAction={handleSubmit}
                submitButtonLabel="Save Property"
                defaultValues={{
                    address1,
                    address2,
                    city,
                    postcode,
                    price,
                    bedrooms,
                    bathrooms,
                    description,
                    status,
                }} />
        </div>
    )
}
