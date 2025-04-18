'use client'

import { HeartIcon } from "lucide-react"
import { addFavourite } from "./action"
import { useAuth } from "@/context/auth"

export default function ToggleFavouriteButton({ propertyId, isFavourite }: {
    propertyId: string;
    isFavourite: boolean;
}) {
    const auth = useAuth();

    return (
        <button className="absolute top-2 right-2 z-10"
            onClick={async () => {
                if (!auth.currentUser) return
                const tokenResult = await auth?.currentUser.getIdTokenResult()
                if (!tokenResult) return
                await addFavourite(propertyId, tokenResult.token)
            }
            }>
            <HeartIcon fill={isFavourite ? "pink" : "white"} />
        </button>
    )
}
