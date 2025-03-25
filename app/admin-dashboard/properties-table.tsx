import PropertyStatusBadge from '@/components/Property-status-badge';
import { Button } from '@/components/ui/button';
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell, TableFooter } from '@/components/ui/table'
import { getProperties } from '@/data/properties'
import { EyeIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import numeral from "numeral"

export default async function PropertyTable({
    page = 1
}: {
    page?: number;
}) {
    const { data, totalPages } = await getProperties({
        pagination: {
            page,
            pageSize: 2,
        }
    });
    return <>
        {!data && (
            <h1 className=' text-center text-zinc-400 py-20 font-bold text-3xl'>
                You have no properties
            </h1>
        )}

        {!!data && (
            <Table className="mt-5 " >
                <TableHeader>
                    <TableRow>
                        <TableHead>Address</TableHead>
                        <TableHead>Lasting Price</TableHead>
                        <TableHead>Status </TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(property => {
                        const address = [
                            property.address1,
                            property.address2,
                            property.city,
                            property.postcode,
                        ].filter((addressLine) => !!addressLine) // 빈 값 제외
                            .join(","); // 쉼표로 연결
                        return (
                            <TableRow key={property.id}>
                                <TableCell>{address}</TableCell>
                                <TableCell>€ {numeral(property.price).format("0,0")}</TableCell>
                                <TableCell>
                                    <PropertyStatusBadge status={property.status} />
                                </TableCell>
                                <TableCell className="flex justify-end gap-1">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/property/${property.id}`}>
                                            <EyeIcon />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="sm" className="mx-1">
                                        <Link href={`/admin-dashboard/edit/${property.id}`}>
                                            <PencilIcon />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className='text-center'>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Button
                                    key={i}
                                    asChild={page !== i + 1} // 현재 페이지가 아닐 때만 asChild 적용
                                    variant="outline"
                                    className='mx-1'
                                    disabled={page === i + 1} // 현재 페이지 버튼은 비활성화
                                >
                                    <Link href={`/admin-dashboard?page=${i + 1}`}>{i + 1}</Link>
                                </Button>
                            ))}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table >
        )
        }
    </>
}