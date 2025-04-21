"use client"
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { removefavourite } from '@/app/property-search/action'
import { useAuth } from '@/context/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


export default function RemoveFavouriteButton({
    propertyId
}: {
    propertyId: string;
}) {
    const auth = useAuth()
    const router = useRouter()

    return (
        <Button
            variant="outline"
            onClick={async () => {
                const tokenResult = await auth?.currentUser?.getIdTokenResult()
                if (!tokenResult) { return }
                await removefavourite(propertyId, tokenResult.token)
                toast.success("success", {
                    description: "Property was removed from favourites lists."
                })
                router.refresh();
            }}
        >
            <Link href="#">
                <Trash2Icon />
            </Link>
        </Button>
    )
}