import { firestore } from "@/firebase/server"; // Import firestore
import type { Property } from "../types/property" // Import Property type

export const getPropertyById = async (id: string) => {
    const propertySnapshot = await firestore
        .collection("properties")
        .doc(id) // Changed from propertyId to id to match the parameter name
        .get()

    if (!propertySnapshot.exists) {
        return null // Handle case when document doesn't exist
    }

    const propertyData = {
        id: propertySnapshot.id,
        ...propertySnapshot.data(),
    } as Property

    return propertyData
}

