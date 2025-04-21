import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserFavourites } from '@/data/favourites'
import { getPropertiesById } from '@/lib/properties'
import { Button } from '@/components/ui/button'
import PropertyStatusBadge from '@/components/Property-status-badge'
import { EyeIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'

export default async function MyFavourites({
    searchParams
}: {
    searchParams?: Promise<Record<string, string | undefined>>
}) {

    const searchParamsValue = await searchParams
    //“URL에서 page 번호를 가져오되, 없으면 1로 처리
    const page = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1
    //문자열(string)을 정수(integer)로 변환해주는 함수
    //parseInt("42")  42 , parseInt("003") 3, parseInt("10px") 10, parseInt("abc") NaN (숫자 아님)
    const pageSize = 5;
    const favourites = await getUserFavourites();
    const allFavourites = Object.keys(favourites)
    // Object.keys() : 객체 다루는 함수
    // 현재 사용자가 즐겨찾기한 모든 property의 ID 리스트 ex: ["property1", "property7", "property9"]
    //Object.values(favourites) → [true, true, true]
    //Object.entries(favourites) → [[property1, true], [property7, true], ...]
    const totalPages = Math.ceil(allFavourites.length / pageSize)
    const paginatedFavourites = allFavourites.slice(
        (page - 1) * pageSize,
        page * pageSize
    )
    //console.log({ paginatedFavourites })

    const properties = await getPropertiesById(paginatedFavourites)
    //console.log({ properties })

    return (
        <div className='max-w-screen-lg mx-auto'>
            <h1 className="text-4xl font-bold py-4 mt-5">My Favourites lists.</h1>
            {!paginatedFavourites.length && (
                <h2 className='text-center text-zinc-400 text-3xl font-bold py-10 '>You have no favourited lists.</h2>
            )}
            {!!paginatedFavourites.length && (
                <Table className='mt-4'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Property
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedFavourites.map((favourite) => {
                            const property = properties.find(
                                (property) => property.id === favourite
                            )
                            const address = [
                                property?.address1,
                                property?.address2,
                                property?.city,
                                property?.postcode,
                            ].filter((addressLine) => !!addressLine)
                                .join(",");

                            return (
                                <TableRow key={favourite}>
                                    <TableCell>{address}</TableCell>
                                    <TableCell>
                                        {!!property && (
                                            <PropertyStatusBadge status={property?.status} />
                                        )}
                                    </TableCell>
                                    <TableCell className='flex justify-center gap-2'>
                                        {!!property && (
                                            <>
                                                <Button asChild variant="outline">
                                                    <Link href={`/property/${property.id}`}>
                                                        <EyeIcon />
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline">
                                                    <Link href="#">
                                                        <Trash2Icon />
                                                    </Link>
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}

        </div>
    )
}
