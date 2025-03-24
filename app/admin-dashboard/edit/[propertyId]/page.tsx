import { Breadcrumbs } from '@/components/ui/breadcrumb'
import { getPropertiesId } from '@/data/properties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function EditProperty({ params }: {
    params: Promise<any>
}) {
    const paramsValue = await params;
    const prorperty = await getPropertiesId(paramsValue.propertyId)

    return (
        <div>
            <Breadcrumbs items={[{
                href: "/admin-dashboard",
                label: "Dashboard"
            }, {
                label: "Edit Property"
            }]}
            />
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Edit Property
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    edit property form
                </CardContent>
            </Card>
        </div>
    )
}
