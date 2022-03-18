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

	// useEffect(() => {
	// 	console.log({ best_sellers })
	// }, [best_sellers])

	useEffect(() => {
		console.log({ cart })
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

	return (
		<div className="App">
			<AppCtx.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen, setShowNotif, setIsCartUpdated }}>
				<Notification item={cart[cart.length - 1]} showNotif={showNotif} />
				<CartModal />

				<Header />
				{/* <Menu /> */}
				<section>
					<Products title="Best Sellers" products={[...best_rice, ...best_pika, ...best_coffee]} />
					<Products
						title="All Products"
						products={[...best_rice, ...rice, ...pika, ...best_pika, ...coffee, ...best_coffee]}
					/>
				</section>
			</AppCtx.Provider>
		</div>
	)
}

export default App
