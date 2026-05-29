import { useState, useEffect, type Dispatch, type SetStateAction } from "react"
import { Link } from "react-router-dom"
import { getAllProducts } from "../services/products.service"
import Loader from "../components/Loader"
import Error from "../components/Error"
import type { Product } from "../types/Product"
import { Type } from "../types/Product"

type AllProducts = {
    products: Product[]
}

type SortType = "" | "price-asc" | "price-desc" | "az" | "za"

type FilterProps = {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    sort: string
    setSort: Dispatch<SetStateAction<SortType>>
    categories: Type[]
    setCategories: Dispatch<SetStateAction<Type[]>>
}

function Filter({
    search, setSearch,
    sort, setSort,
    categories, setCategories
}: FilterProps) {

    function handleCategoryChange(type: Type) {
        setCategories(prev =>
            prev.includes(type)
                ? prev.filter(category => category !== type)
                : [...prev, type]
        )
    }

    return (
        <aside className="filters">
            <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="filter-section">
                <h3>Categoría</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={categories.includes(Type.DRINK)}
                        onChange={() => handleCategoryChange(Type.DRINK)}
                    /> Bebidas
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={categories.includes(Type.MERCH)}
                        onChange={() => handleCategoryChange(Type.MERCH)}
                    /> Merchandising
                </label>
            </div>

            <div className="filter-section">
                <h3>Orden</h3>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        checked={sort === "price-desc"}
                        onChange={() => setSort("price-desc")}
                    /> Price: highest to lowest
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        checked={sort === "price-asc"}
                        onChange={() => setSort("price-asc")}
                    /> Price: lowest to highset
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        checked={sort === "za"}
                        onChange={() => setSort("za")}
                    /> A-Z
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        checked={sort === "az"}
                        onChange={() => setSort("az")}
                    /> Z-A
                </label>
            </div>
        </aside>
    )
}

function Products({ products }: AllProducts) {
    return (
        <section className="products">

            {
                products.map((product) => (
                    <div className="shop-card" key={product.id}>
                        <div className={`product-img ${product.type === Type.DRINK ? "drink" : "merch"}`}>
                            <img src={`/shop/${product.images[0]}.jpg`} alt="producto" />
                        </div>
                        <h4>{product.name}</h4>
                        <div className="bot">
                            <p className="price">${product.price}</p>
                            <Link to={`/shop/${product.id}`}>See</Link>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

function ShopPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState<Type[]>([])
    const [sort, setSort] = useState<SortType>("")

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true)

                await new Promise((resolve) =>
                    setTimeout(resolve, 1000)
                );

                const data = await getAllProducts()

                setProducts(data)
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        .filter(product => categories.length === 0 || categories.includes(product.type))
        .sort((a, b) => {
            switch (sort) {
                case "price-asc":
                    return a.price - b.price;

                case "price-desc":
                    return b.price - a.price;

                case "az":
                    return a.name.localeCompare(b.name)

                case "za":
                    return b.name.localeCompare(a.name)

                default:
                    return 0;
            }
        })

    return (
        <>
            {
                loading ? (
                    <Loader bgColor="#fff" />
                ) : (

                    error ? (
                        <Error errorMsg="Error loading products" bgColor="#fff" />
                    ) : (
                        <>
                            <div className="header">
                                <h1>Shop</h1>
                                <p>The taste of the apocalypse in every bottle.</p>
                            </div>

                            <div className="shop">
                                <Filter
                                    search={search}
                                    setSearch={setSearch}
                                    sort={sort}
                                    setSort={setSort}
                                    categories={categories}
                                    setCategories={setCategories}
                                />
                                <Products products={filteredProducts} />
                            </div>
                        </>
                    )
                )
            }
        </>
    )
}

export default ShopPage