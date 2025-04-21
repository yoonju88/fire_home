import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserFavourites } from '@/data/favourites'
import { getPropertiesById } from '@/lib/properties'
import { Button } from '@/components/ui/button'
import PropertyStatusBadge from '@/components/Property-status-badge'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import RemoveFavouriteButton from './remove-favourite'
import { redirect } from 'next/navigation'

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
    const pageSize = 2;
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

    //property 제거 버튼을 눌렀을때 해당페이지가 더이상 존재 하지 않으면 경로 다시 수정
    if (!paginatedFavourites.length && page > 1) {
        redirect(`/account/my-favourites?page=${totalPages}`)
    }

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
                                    <TableCell className='flex justify-center items-center gap-2'>
                                        {!!property && (
                                            <>
                                                <Button asChild variant="outline">
                                                    <Link href={`/property/${property.id}`}>
                                                        <EyeIcon />
                                                    </Link>
                                                </Button>
                                                <RemoveFavouriteButton propertyId={property.id} />
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className='text-center'
                            >
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    return (
                                        <Button
                                            key={i}
                                            asChild={page !== i + 1} // 현재 페이지가 아닐 때만 asChild 적용
                                            variant="outline"
                                            className='mx-1'
                                            disabled={page === i + 1} // 현재 페이지 버튼은 비활성화
                                        >
                                            <Link href={`/account/my-favourites?page=${i + 1}`}>{i + 1}</Link>
                                        </Button>
                                    )
                                })}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}

        </div>
    )
}
