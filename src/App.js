import { Menu } from "./components/Menu/index"
import { Header } from "./components/Header/index"
import Products from "./components/Menu/products"
import { useState, createContext, useEffect, useContext } from "react"
import { Modal } from "@mui/material"
import CartModal from "./components/Cart"
import Notification from "./components/Menu/notification"
import { MainCtx } from "./index"
import { GetData } from "./components/firestore"

export const AppCtx = createContext({})

function App() {
	const { db } = useContext(MainCtx)
	const [cart, setCart] = useState([])
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [showNotif, setShowNotif] = useState(false)
	const [isCartUpdated, setIsCartUpdated] = useState(false)

	const { best_sellers: best_rice, products: rice } = GetData({ colRef: "rice_meals", db })
	const { best_sellers: best_pika, products: pika } = GetData({ colRef: "pika-pika", db })
	const { best_sellers: best_coffee, products: coffee } = GetData({ colRef: "coffee_blends", db })
	const { best_sellers: best_milktea, products: milktea } = GetData({ colRef: "milktea", db })

	useEffect(() => {
		cart.length > 0 && setShowNotif(true)
		cart.length > 0 && isCartUpdated && handleUpdateCart()
	}, [cart])

	useEffect(() => {
		isCartOpen && cart.length > 0 && handleUpdateCart()
	}, [isCartOpen])

	const handleUpdateCart = () => {
		const latestItem = cart[cart.length - 1]

		const filtered = cart.filter(item => item.id !== latestItem.id)
		const duplicates = cart.filter(item => item.id === latestItem.id)

		let total_quantity = 0
		duplicates.forEach(item => {
			total_quantity = total_quantity + item.quantity
		})

		setCart([...filtered, { ...duplicates[0], quantity: total_quantity }])
		setIsCartUpdated(false)
	}

	useEffect(() => {
		setIsCartUpdated(true)
		if (showNotif) {
			setIsCartUpdated(false)
			setTimeout(() => {
				setShowNotif(false)
			}, 1000)
		}
	}, [showNotif])

	const handleCheckout = () => {
		console.log({ cart })
	}

	return (
		<div className="App">
			<AppCtx.Provider
				value={{
					cart,
					setCart,
					isCartOpen,
					setIsCartOpen,
					setShowNotif,
					setIsCartUpdated,
					products: [...best_rice, ...best_pika, ...best_coffee, ...best_milktea],
					handleCheckout
				}}
			>
				<Notification item={cart[cart.length - 1]} showNotif={showNotif} />
				<CartModal />

				<Header />
				{/* <Menu /> */}
				<section>
					<Products title="Best Sellers" products={[...best_rice, ...best_pika, ...best_coffee, ...best_milktea]} />
					<Products
						title="All Products"
						products={[...pika, ...best_pika, ...best_rice, ...rice, ...coffee, ...best_coffee, ...milktea]}
					/>
					<Products title="Rice Meals" products={[...best_rice, ...rice]} />
					<Products title="Pika - Pika" products={[...pika, ...best_pika]} />
					<Products title="Coffee Blends" products={[...best_coffee, ...coffee]} />
					<Products title="Milktea" products={[...best_milktea, ...milktea]} />
				</section>
			</AppCtx.Provider>
		</div>
	)
}

export default App
