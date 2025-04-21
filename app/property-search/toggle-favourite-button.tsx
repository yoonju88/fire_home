'use client'

import { HeartIcon } from "lucide-react"
import { addFavourite, removefavourite } from "./action"
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ToggleFavouriteButton({ propertyId, isFavourite }: {
    propertyId: string;
    isFavourite: boolean;
}) {
    const auth = useAuth();
    const router = useRouter();

    return (
        <button className="absolute top-0 right-0 p-2 z-10 bg-white rounded-bl-lg"
            onClick={async () => {
                if (!auth.currentUser) return
                const tokenResult = await auth?.currentUser.getIdTokenResult()
                if (!tokenResult) return

                if (isFavourite) {
                    await removefavourite(propertyId, tokenResult.token)
                } else {
                    await addFavourite(propertyId, tokenResult.token)
                }
                toast.success("success", {
                    description: `Property ${isFavourite ? "removed from" : "added to"} from favourites`,
                });
                router.refresh();
            }}
        >
            <HeartIcon className="text-black" fill={isFavourite ? "#db2777" : "white"} />
        </button>
    )
}
