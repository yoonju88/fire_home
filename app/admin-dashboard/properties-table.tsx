import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import { getProperties } from '@/data/properties'


export default async function PropertyTable() {
    const { data, totalPages } = await getProperties({
        pagination: {
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
                                <TableCell>{property.price}</TableCell>
                                <TableCell>{property.status}</TableCell>
                                <TableCell>view /edit</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table >
        )
        }
    </>
}