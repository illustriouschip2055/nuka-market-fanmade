import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import type { Product, CheckoutItem } from "../types/Product";
import { useState, useEffect } from "react";
import { useCheckout } from "../context/CheckoutContext";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { getProduct } from "../services/products.service";

type ProductProps = {
    product: Product
}

type GalleryProps = {
    imgs: string[]
}

function Product({ product }: ProductProps) {
    const [qty, setQty] = useState(1)

    const { addToCart } = useCart()
    const { startCheckout } = useCheckout()

    const navigate = useNavigate()

    const checkProduct: CheckoutItem[] = [{
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty
    }]

    const handleBuy = () => {
        startCheckout(checkProduct, 'direct')
        navigate('/checkout')
    }

    return (
        <div className="product">
            <div className="title">{product.name}</div>
            <div className="rating">★★★★★ (134)</div>

            <div>
                <span className="price">$ {product.price}</span>
                <span className="old-price">$9.99</span>
            </div>

            <div className="desc">
                {product.description}
            </div>

            <div className="stock">Stock available: {product.stock}</div>

            <div className="quantity">
                <button onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}>-</button>
                <span id="qty">{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <div className="actions">
                <button
                    className="btn buy"
                    onClick={() => handleBuy()}
                >
                    Buy now
                </button>
                <button
                    className="btn cart"
                    onClick={() => addToCart(product, qty)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

function Gallery({ imgs }: GalleryProps) {
    const [mainImg, setMainImg] = useState(imgs[0])

    useEffect(() => {
        if (imgs.length > 0) {
            setMainImg(imgs[0])
        }
    }, [imgs])

    return (
        <div className="gallery">
            <img id="mainImage" src={`/shop/${mainImg}.jpg`} alt="producto" />

            <div className="thumbs">
                {
                    imgs.map((img) => (
                        <img
                            key={img}
                            src={`/shop/${img}.jpg`}
                            alt="product"
                            onClick={() => setMainImg(img)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

function ProductPage() {
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadProduct() {
            setLoading(true)
            try {
                if (!id) {
                    navigate('/shop')
                    return
                }
                const data = await getProduct(id)
                setProduct(data)
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setLoading(false)
                setError(false)
            }
        }

        loadProduct()
    }, [])

    let content, imgsArr: string[], detailsArr: string[]

    if (!product) {
        content = <p>Loading...</p>
        imgsArr = []
        detailsArr = []
    } else {
        content = <Product product={product} />
        imgsArr = product.images
        detailsArr = product.details
    }


    return (
        <>
            {
                loading ? (
                    <Loader bgColor="#1a1a1a" />
                ) : (

                    error ? (
                        <Error errorMsg="Error loading product" bgColor="#1a1a1a" />
                    ) : (


                        <div className="product-container">
                            <div className="top">
                                <Gallery imgs={imgsArr} />

                                {content}
                            </div>

                            <div className="details">
                                <h2>Product Details</h2>
                                <ul>
                                    {
                                        detailsArr.map((d, i) => (
                                            <li key={i}>- {d}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                )
            }
        </>

    )
}

export default ProductPage