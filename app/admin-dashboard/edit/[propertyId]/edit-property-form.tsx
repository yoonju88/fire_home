"use client"

import PropertyForm from "@/components/PropertyForm";
import { Property } from "@/types/property"
import { propertyDataSchema } from "@/validation/propertySchema";
import { z } from "zod"
import { useAuth } from "@/context/auth";
import { updateProperty } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SaveIcon } from "lucide-react";

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
    images = [],
}: Props) {
    const auth = useAuth()
    const router = useRouter()

    const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken()
        if (!token) { return; }
        await updateProperty({ ...data, id }, token);
        //...data로 기존 데이터를 복사하고 id를 추가하는 이유는 업데이트할 데이터와 해당 데이터의 고유 식별자(id)를 하나의 객체로 묶어 updateProperty 함수에 전달하기 위함
        //방식은 데이터를 관리할 때 필요한 모든 정보를 하나의 객체로 결합하여 처리
        toast.success("Success!", {
            description: "Property updated successfully 👏🏼"

        })
        router.push('/admin-dashboard')
    }
    return (
        <div>
            <PropertyForm
                handleSubmitAction={handleSubmit}
                submitButtonLabel={
                    <>
                        <SaveIcon /> Save Property
                    </>
                }
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
                    images: images.map(image => ({
                        id: image,
                        url: image,
                    })),
                }}
            />
        </div>
    )
}
