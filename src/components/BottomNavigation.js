import {useState, useContext, useEffect} from "react"
import {BottomNavigation as Navigation, BottomNavigationAction, Chip, Paper} from "@mui/material"
import {Home, DeliveryDining, ShoppingCartOutlined, LocationOnOutlined, Badge, Person} from "@mui/icons-material"
import {AppCtx} from "./../App"
import {useFormControlUnstyled} from "@mui/base"
import Logo from "../nc_logo.svg"

const BottomNavigation = () => {
	const {setIsCartOpen, isCartOpen, isProductOpen, cart, setInfoSaved, infoSaved, setIndex, index} = useContext(AppCtx)
	const [value, setValue] = useState("Home")

	useEffect(() => {
		value === "Cart" && setIsCartOpen(true)

		value === "User" && setInfoSaved(false)

		value === "Home" && setIndex(0)
	}, [value])

	useEffect(() => {
		!isCartOpen && infoSaved && setValue("")
	}, [isCartOpen, infoSaved])

	useEffect(() => {
		console.log({cart})
	}, [cart])

	useEffect(() => {
		index !== 0 && setValue("")
	}, [index])

	return (
		<Paper
			className={isCartOpen || isProductOpen || !infoSaved ? "blr blur" : "blr"}
			sx={{
				position: "fixed",
				bottom: 0,
				left: "50%",
				width: "100%",
				maxWidth: 500,
				transform: "translateX(-50%)"
			}}
			elevation={12}
		>
			<Navigation
				sx={{
					width: "100%",
					maxWidth: 500
				}}
				value={value}
				onChange={(e, val) => setValue(val)}
			>
				<BottomNavigationAction
					sx={{
						color: value === "Home" ? "#ed6c02 !important" : "inherit",
						pl: 3
					}}
					label="Home"
					value="Home"
					icon={
						<div className="logo-wrapper">
							{/* <Logo style={{ fontSize: 24 }} /> */}
							<img
								src={Logo}
								alt="NICED Craves"
								style={{
									maxWidth: value === "Home" ? 24 : 40,
									marginTop: value === "Home" ? 0 : 5
								}}
							/>
						</div>
					}
					//   icon={<Home color={value === 'Home' ? 'warning' : 'disabled'} />}
				/>
				<BottomNavigationAction
					sx={{
						color: value === "Delivery" ? "#ed6c02 !important" : "inherit"
					}}
					label="Delivery"
					value="Delivery"
					icon={<DeliveryDining color={value === "Delivery" ? "warning" : "disabled"} />}
				/>
				<BottomNavigationAction
					sx={{
						color: value === "Contact" ? "#ed6c02 !important" : "inherit"
					}}
					label="Contact"
					value="Contact"
					icon={<LocationOnOutlined color={value === "Contact" ? "warning" : "disabled"} />}
				/>

				<BottomNavigationAction
					sx={{color: value === "Cart" ? "#ed6c02 !important" : "inherit"}}
					label="Cart"
					value="Cart"
					icon={
						<div style={{display: "flex", alignItems: "center"}}>
							<ShoppingCartOutlined color={value === "Cart" ? "warning" : "disabled"} />
							{cart.length > 0 && (
								<Chip
									label={cart.length}
									size="small"
									//   color={value === 'Cart' ? 'warning' : 'default'}
									color="error"
								/>
							)}
						</div>
					}
				/>
				<BottomNavigationAction
					sx={{
						color: value === "User" ? "#ed6c02 !important" : "inherit",
						pr: 3
					}}
					label="User"
					value="User"
					icon={<Person color={value === "User" ? "warning" : "disabled"} />}
				/>
			</Navigation>
		</Paper>
	)
}

export default BottomNavigation
