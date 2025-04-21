import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { Suspense } from 'react'
import FiltersForm from './filters-form'
import { getProperties } from '@/data/properties';
import Image from 'next/image';
import imageUrlFormatter from '@/lib/imageUrlFormatter';
import { BedIcon, HomeIcon, BathIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import numeral from 'numeral';
import Link from "next/link"
import ToggleFavouriteButton from './toggle-favourite-button';
import { getUserFavourites } from '@/data/favourites';
import { cookies } from 'next/headers';
import { auth } from "@/firebase/server"
import { DecodedIdToken } from 'firebase-admin/auth';

interface PropertySearchParams {
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    [key: string]: string | string[] | undefined;
}

export default async function PropertySearch({
    searchParams
}: {
    searchParams: Promise<PropertySearchParams>
}) {
    const searchParamsValues = await searchParams;

    const parsedPage = parseInt(searchParamsValues.page || '1')
    const parsedMinPrice = parseInt(searchParamsValues.minPrice || '0')
    const parsedMaxPrice = parseInt(searchParamsValues.maxPrice || '0')
    const parsedMinBedrooms = parseInt(searchParamsValues.minBedrooms || '0')

    const page = isNaN(parsedPage) ? 1 : parsedPage
    const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice
    const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice
    const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms

    const { data, totalPages } = await getProperties({
        pagination: {
            page,
            pageSize: 3,
        },
        filters: {
            minPrice,
            maxPrice,
            minBedrooms,
            status: ["for-sale"]
        }
    })

    const userFavourites = await getUserFavourites();
    if (!userFavourites) { return }
    //console.log({userFavourites})
    //cookieStore는 Web Platform API 중 하나로, 브라우저의 쿠키에 접근할 수 있는 인터페이스
    const cookieStore = await cookies();
    const token = (await cookieStore.get("firebaseAuthToken"))?.value
    // ?.value 덕분에 쿠키가 없어도 오류가 나지 않도록 안전하게 처리
    let verifiedToken: DecodedIdToken | null;

    if (token) {
        verifiedToken = await auth.verifyIdToken(token)
    }



    return (
        <div className="max-w-screen-lg mx-auto">
            <h1 className="text-4xl font-bold p-5">
                Property search page
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>FILTERS</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense>
                        <FiltersForm />
                    </Suspense>
                </CardContent>
            </Card>
            <div className="grid grid-cols-3 mt-5 gap-5">
                {data.map(property => {
                    const addressLines = [
                        property.address1,
                        property.address2,
                        property.city,
                        property.postcode,
                    ]
                        .filter(addressLine => !!addressLine)
                        .join(" , ")
                    return (
                        <Card key={property.id} className='overflow-hidden'>
                            <CardContent className='px-0'>
                                <div className='h-40 relative bg-sky-50 text-zinc-400 flex flex-col justify-center items-center'>
                                    { // 관리자(admin)가 아니거나, 아예 인증이 안 된 사용자일 경우
                                        (!verifiedToken || !verifiedToken.admin) && (
                                            <ToggleFavouriteButton
                                                isFavourite={userFavourites[property.id]}
                                                propertyId={property.id}
                                            />
                                        )}

                                    {!!property.images?.[0] &&
                                        <Image
                                            fill
                                            className="object-cover"
                                            src={imageUrlFormatter(property.images[0])
                                            }
                                            alt=''
                                        />
                                    }
                                    {!property.images?.[0] && (
                                        <>
                                            <HomeIcon />
                                            <small>No Image</small>
                                        </>
                                    )}
                                </div>
                                <div className=" flex flex-col gap-5 p-5 ">
                                    <p>{addressLines}</p>
                                    <div className='flex gap-5'>
                                        <div className="flex gap-2">
                                            <BedIcon />{property.bedrooms}
                                        </div>
                                        <div className="flex gap-2">
                                            <BathIcon />{property.bathrooms}
                                        </div>
                                    </div>
                                    <p className='text-2xl'>
                                        €{numeral(property.price).format("0,0")}
                                    </p>
                                    <Button asChild>
                                        <Link href={`/property/${property.id}`}>
                                            View Property
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
            <div className="flex gap-2 items-center justify-center py-10">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const newSearchParams = new URLSearchParams()

                    if (searchParamsValues?.minPrice) {
                        newSearchParams.set("minPrice", searchParamsValues.minPrice)
                    }

                    if (searchParamsValues?.maxPrice) {
                        newSearchParams.set("maxPrice", searchParamsValues.maxPrice)
                    }

                    if (searchParamsValues?.minBedrooms) {
                        newSearchParams.set("minBedrooms", searchParamsValues.minBedrooms)
                    }
                    newSearchParams.set("page", `${i + 1}`)

                    return (
                        <Button
                            key={i}
                            asChild={page !== i + 1}
                            disabled={page === i + 1}
                            variant='outline'
                        >
                            <Link href={`/property-search?${newSearchParams.toString()}`}>
                                {i + 1}
                            </Link>
                        </Button>
                    )
                })}
            </div>
        </div >
    )
}
