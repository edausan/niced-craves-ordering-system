import { Menu } from "./components/Menu/index"
import { Header } from "./components/Header/index"
import BestSeller from "./components/Menu/best.seller"
import { useState, createContext, useEffect } from "react"
import { Modal } from "@mui/material"
import CartModal from "./components/Cart"
import Notification from "./components/Menu/notification"

export const AppCtx = createContext({})

function App() {
	const [cart, setCart] = useState([])
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [showNotif, setShowNotif] = useState(false)
	const [isCartUpdated, setIsCartUpdated] = useState(false)

	useEffect(() => {
		cart.length > 0 && isCartUpdated && handleUpdateCart()
	}, [cart])

	useEffect(() => {
		isCartOpen && cart.length > 0 && handleUpdateCart()
	}, [isCartOpen])

	const handleUpdateCart = () => {
		const latestItem = cart[cart.length - 1]
		const isExist = cart.findIndex(item => {
			console.log({ latestItem, item })
			return (
				item.id === latestItem.id &&
				item.flavor === latestItem.flavor &&
				item.price === latestItem.price &&
				item.name === latestItem.name
			)
		})

		const filtered = cart.filter(item => item.id !== latestItem.id)
		const duplicates = cart.filter(item => item.id === latestItem.id)

		let total_quantity = 0
		duplicates.forEach(item => {
			total_quantity = total_quantity + item.quantity
		})

		console.log({ filtered, duplicates })
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
					<BestSeller />
				</section>
			</AppCtx.Provider>
		</div>
	)
}

export default App
