"use client"

import PropertyForm from '@/components/PropertyForm'
import { useAuth } from "@/context/auth";
import { propertySchema } from '@/validation/propertySchema'
import { z } from "zod"
import { createProperty } from './action'
import { savePropertyImages } from '../action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { storage } from '@/firebase/client';
import { PlusCircleIcon } from "lucide-react";

export default function NewPropertyForm() {
    const auth = useAuth();
    const router = useRouter()

    const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
        const token = await auth?.currentUser?.getIdToken()

        if (!token) { return; }

        const { images, ...rest } = data // data 객체에서 images 속성을 추출하고, 나머지 속성들은 rest라는 새로운 객체에 할당

        const response = await createProperty(rest, token)

        if (!!response.error || !response.propertyId) {
            toast.error("Error!", {
                description: response.message,
            });
            return;
        }

        const uploadTasks: UploadTask[] = [];
        const paths: string[] = [];

        images.forEach((image, index) => {
            console.log(`Step 5: Image ${index}:`, image);
            if (image.file) {
                const path = `properties/${response.propertyId
                    }/${Date.now()}-${index}-${image.file.name}`;
                paths.push(path);
                const storageRef = ref(storage, path);
                uploadTasks.push(uploadBytesResumable(storageRef, image.file));
            }
        })

        await Promise.all(uploadTasks)
        await savePropertyImages(
            { propertyId: response.propertyId, images: paths },
            token
        )

        toast.success("Success!", {
            description: "Property created",
        });
        router.push('/admin-dashboard')

        console.log("Auth State:", auth);
        console.log("Current User:", auth?.currentUser);
        console.log("Token:", token);
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
