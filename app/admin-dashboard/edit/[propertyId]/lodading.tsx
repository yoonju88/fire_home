import { Skeleton } from '@/components/ui/skeleton'
import { HomeIcon } from 'lucide-react'
import React from 'react'
import { Breadcrumbs } from '@/components/ui/breadcrumb'

export default function Loading() {
    return (
        <>
            <Breadcrumbs items={[{
                href: "/admin-dashboard",
                label: "Dashboard"
            }, {
                label: "Edit Property"
            }]}
            />

            <Skeleton className="fixed size-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-950 rounded-full text-white flex justify-center items-center">
                <HomeIcon />
            </Skeleton>
        </>

    )
}