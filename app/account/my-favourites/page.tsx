import { getUserFavourites } from '@/data/favourites'
import { getPropertiesById } from '@/lib/properties'
import React from 'react'

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
        <>

        </>
    )
}
