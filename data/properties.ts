import { firestore, getTotalPages } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import "server-only"

type GetPropertiesOptions = {
    filters?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        minBedrooms?: number | null;
        status?: PropertyStatus[] | null;
    }
    pagination?: {
        pageSize?: number;
        page?: number;
    }
}

export const getProperties = async (options?: GetPropertiesOptions) => {
    const page = options?.pagination?.page || 1;
    const pageSize = options?.pagination?.pageSize || 10
    const { minPrice, maxPrice, minBedrooms, status } = options?.filters || {};

    let propertiesQuery = firestore.collection("properties").orderBy("updated", "desc")
    if (minPrice !== null && minPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
    }
    if (maxPrice !== null && maxPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
    }
    if (minBedrooms !== null && minBedrooms !== undefined) {
        propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
    }
    if (status) {
        propertiesQuery = propertiesQuery.where("status", "in", status);
    }

    const totalPages = await getTotalPages(propertiesQuery, pageSize)

    const propertiesSnapshot = await propertiesQuery
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .get()

    //console.log(propertiesSnapshot.empty)
    if (propertiesSnapshot.empty) {
        // fallback: no filters
        const fallbackQuery = firestore.collection("properties").orderBy("updated", "desc");
        const fallbackSnapshot = await fallbackQuery
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .get();

        const properties = fallbackSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Property));

        const fallbackTotalPages = await getTotalPages(fallbackQuery, pageSize);

        return { data: properties, totalPages: fallbackTotalPages };
    }

    const properties = propertiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Property)
    )
    return { data: properties, totalPages }
}

