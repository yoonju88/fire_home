import { firestore } from "@/firebase/server"; // Import firestore
import type { Property } from "../types/property" // Import Property type

export const getPropertyById = async (id: string) => {
    const propertySnapshot = await firestore
        .collection("properties")
        .doc(id) // Changed from propertyId to id to match the parameter name
        .get();

    if (!propertySnapshot.exists) {
        return null // Handle case when document doesn't exist
    };

    const propertyData = {
        id: propertySnapshot.id,
        ...propertySnapshot.data(),
    } as Property

    return propertyData;
};


export const getPropertiesById = async (propertyIds: string[]) => {
    if (!propertyIds || propertyIds.length === 0) {
        return []; // 빈 배열 반환하면 안전하게 처리됨
    }
    const propertiesSnapshot = await firestore
        .collection("properties")
        .where("__name__", "in", propertyIds)
        .get();


    const propertiesData = propertiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    } as Property)
    );


    return propertiesData;
};
