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
		console.log({ cart })

		if (cart.length > 0 && isCartUpdated) {
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

			const filtered = cart.filter(
				item => item.id !== latestItem.id || item.price !== latestItem.price || item.flavor !== latestItem.flavor
			)
			const duplicates = cart.filter(
				item => item.id === latestItem.id && item.flavor === latestItem.flavor && item.price === latestItem.price
			)
			console.log({ filtered, duplicates })
			setCart([...filtered, { ...duplicates[0], quantity: duplicates.length }])
			setIsCartUpdated(false)
		}
	}, [cart])

	useEffect(() => {
		setIsCartUpdated(true)
		if (showNotif) {
			setIsCartUpdated(false)
			setTimeout(() => {
				setShowNotif(false)
			}, 300)
		}
	}, [showNotif])

	return (
		<div className="App">
			<AppCtx.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen, setShowNotif }}>
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
