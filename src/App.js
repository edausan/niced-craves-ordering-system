/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from "./components/Header/index"
import Products from "./components/Menu/products"
import {useState, createContext, useEffect, useContext} from "react"
import CartModal from "./components/Cart"
import Notification from "./components/Menu/notification"
import {MainCtx} from "./index"
import {Checkout, GetData, GetOrders} from "./components/firestore"
import CustomerInfo from "./components/CustomerInfo"
import LocalStorage from "./components/CustomerInfo/localStorage"
import {Offline} from "react-detect-offline"
import {FirebaseError} from "firebase/app"
import BottomNavigation from "./components/BottomNavigation"
import AddtoHomeScreen from "./components/AddtoHomeScreen"
import SwipeableViews from "react-swipeable-views"
import ViewMore from "./components/ViewMore"

export const AppCtx = createContext({})

function App() {
	const {db} = useContext(MainCtx)

	const {best_sellers: best_rice, products: rice} = GetData({
		colRef: "rice_meals",
		db
	})
	const {best_sellers: best_pika, products: pika} = GetData({
		colRef: "pika-pika",
		db
	})
	const {best_sellers: best_coffee, products: coffee} = GetData({
		colRef: "coffee_blends",
		db
	})
	const {best_sellers: best_milktea, products: milktea} = GetData({
		colRef: "milktea",
		db
	})

	const {data} = GetOrders({db})

	const {setData} = Checkout({db})

	const [cart, setCart] = useState([])
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isProductOpen, setIsProductOpen] = useState(false)
	const [showNotif, setShowNotif] = useState(false)
	const [isCartUpdated, setIsCartUpdated] = useState(false)
	const [customerInfo, setCustomerInfo] = useState({
		name: "",
		address: "",
		phone: "",
		landmark: "",
		house_color: "",
		payment_method: "COD",
		delivery: {name: "", price: 0}
	})
	const [infoSaved, setInfoSaved] = useState(false)
	const [checkedOut, setCheckedout] = useState(false)
	const [isOnline, setIsOnline] = useState(true)
	const [index, setIndex] = useState(0)
	const [viewMoreData, setViewMoreData] = useState({products: [], title: ""})

	const {customerFromStorage, products} = LocalStorage({
		customerInfo,
		infoSaved
	})

	useEffect(() => {
		console.log({ERR: FirebaseError})
	}, [FirebaseError])

	useEffect(() => {
		console.log({network_status: navigator.onLine})
		setIsOnline(navigator.onLine)
	}, [navigator])

	useEffect(() => {
		customerFromStorage?.name && setCustomerInfo(customerFromStorage)
	}, [customerFromStorage])

	useEffect(() => {
		console.log({products})
	}, [products])

	useEffect(() => {
		cart.length > 0 && !isCartOpen && setShowNotif(true)
		cart.length > 0 && isCartUpdated && handleUpdateCart()
	}, [cart])

	useEffect(() => {
		isCartOpen && cart.length > 0 && handleUpdateCart()
	}, [isCartOpen])

	useEffect(() => {
		setIsCartUpdated(true)
		if (showNotif) {
			setIsCartUpdated(false)
		}
	}, [showNotif])

	const handleUpdateCart = () => {
		const latestItem = cart[cart.length - 1]

		const filtered = cart.filter(item => item.id !== latestItem.id)
		const duplicates = cart.filter(item => item.id === latestItem.id)

		let total_quantity = 0
		duplicates.forEach(item => {
			total_quantity = total_quantity + item.quantity
		})

		setCart([...filtered, {...duplicates[0], quantity: total_quantity}])
		setIsCartUpdated(false)
	}

	const handleCheckout = () => {
		setCheckedout(true)
		let total = 0
		cart.forEach(item => {
			// console.log({ item });
			const subtotal =
				item.quantity * item.selected_price + (item.add_on ? 10 : 0) * item.quantity - (item.rice === "no-rice" ? 5 : 0)
			total = total + subtotal
		})
		// window
		//   .open('https://www.facebook.com/messages/t/niced.craves', '_blank')
		//   .focus();
		const date = new Date()
		setData({
			cart,
			customer: customerInfo,
			date_created: date.toISOString(),
			total,
			status: "Pending"
		})

		setTimeout(() => {
			setCart([])
			setCheckedout(false)
		}, 1000)
	}

	const value = {
		cart,
		setCart,
		isCartOpen,
		setIsCartOpen,
		setShowNotif,
		setIsCartUpdated,
		products: isOnline
			? [...best_rice, ...best_pika, ...best_coffee, ...best_milktea]
			: [
					...products.best_coffee,
					...products.best_milktea,
					...products.best_pika,
					...products.best_rice,
					...products.pika,
					...products.rice
			  ],
		orders: data,
		customerInfo,
		handleCheckout,
		checkedOut,
		setIsProductOpen,
		isProductOpen,
		setInfoSaved,
		infoSaved,
		index,
		setIndex,
		viewMoreData,
		setViewMoreData
	}

	return (
		<div className="App">
			{/* <Offline>
        <div
          style={{
            width: '100%',
            background: 'red',
            color: 'white',
            textAlign: 'center',
            zIndex: '1009',
          }}
        >
          <small>You are offline.</small>
        </div>
      </Offline> */}
			<AppCtx.Provider value={value}>
				<SwipeableViews index={index}>
					<section style={{overflowY: "auto", maxHeight: "100vh"}}>
						<AddtoHomeScreen />
						<Notification item={cart[cart.length - 1]} showNotif={showNotif} />
						<CartModal />
						<CustomerInfo
							setCustomerInfo={setCustomerInfo}
							customerInfo={customerInfo}
							setInfoSaved={setInfoSaved}
							infoSaved={infoSaved}
						/>

						<Header />
						<section
							className={isCartOpen || isProductOpen || !infoSaved || index === 1 ? "blr blur" : "blr"}
							style={{
								paddingBottom: 60
								// filter: isCartOpen ? 'blur(4px)' : 'blur(0)',
							}}
						>
							<Products
								title="Best Sellers"
								products={
									isOnline
										? [...best_rice, ...best_pika, ...best_coffee, ...best_milktea]
										: [...products.best_coffee, ...products.best_milktea, ...products.best_pika, ...products.best_rice]
								}
							/>

							<Products
								title="All Products"
								products={
									isOnline
										? [...pika, ...best_pika, ...best_rice, ...rice, ...coffee, ...best_coffee, ...milktea]
										: [
												...products.best_coffee,
												...products.best_milktea,
												...products.best_pika,
												...products.best_rice,
												...products.pika,
												...products.rice
										  ]
								}
							/>
							<Products
								title="Rice Meals"
								products={isOnline ? [...best_rice, ...rice] : [...products.best_rice, ...products.rice]}
							/>
							<Products
								title="Pika - Pika"
								products={isOnline ? [...pika, ...best_pika] : [...products.pika, ...products.best_pika]}
							/>
							<Products
								title="Coffee Blends"
								products={isOnline ? [...best_coffee, ...coffee] : [...products.best_coffee]}
							/>
							<Products
								title="Milktea"
								products={isOnline ? [...best_milktea, ...milktea] : [...products.best_milktea]}
							/>
						</section>
					</section>

					<ViewMore />
				</SwipeableViews>
				<BottomNavigation />
			</AppCtx.Provider>
		</div>
	)
}

export default App
