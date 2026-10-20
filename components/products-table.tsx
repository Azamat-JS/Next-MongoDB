import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export type Product = {
    name: string;
    price: number;
}

type Products = Product[]

export function TableDemo({ products }: { products: Products }) {

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">No</TableHead>
                    <TableHead className="w-[100px] text-center">Name</TableHead>
                    <TableHead className="w-[100px] text-center">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((invoice, index) => (
                    <TableRow key={invoice.name}>
                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                        <TableCell className="font-medium text-center">{invoice.name}</TableCell>
                        <TableCell className="font-medium text-center">{invoice.price}</TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell className="text-right">Total products: {products.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
