import { DrawerDemo } from "@/components/Drawer";
import { TableDemo } from "@/components/products-table"


export default async function ProductsPage() {

    const data = await fetch('http://localhost:4000/api/products', {
        cache: 'default'
    });
    const result = await data.json();
    return (
        <>
            <header className="flex p-5 items-center justify-between bg-linear-135 from-orange-300 to-green-400">
                <h1 className="text-2xl font-bold">
                    Products page
                </h1>

                <input type="text" placeholder="Search product..." className="w-65 h-10 bg-white px-4 rounded-2xl" />
                <DrawerDemo />
            </header>

            <div className="p-5 w-150">
                <TableDemo products={result} />
            </div>
        </>
    )
}
