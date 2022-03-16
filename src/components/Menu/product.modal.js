import React, { useState, useEffect, useContext } from "react"

import {
	Grid,
	Modal,
	Button,
	Typography,
	TextField,
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	ToggleButtonGroup,
	ToggleButton
} from "@mui/material"
import { ShoppingCart, CurrencyRuble } from "@mui/icons-material"
import Notification from "./notification"
import { AppCtx } from "../../App"

const ProductModal = ({ isOpen, setIsOpen, setCart }) => {
	const { setShowNotif } = useContext(AppCtx)
	const { name, img, prices, id, sizes, flavors, add_ons } = isOpen.product
		? isOpen.product
		: {
				id: null,
				name: null,
				img: null,
				sizes: [],
				flavors: [],
				add_ons: [],
				prices: []
		  }

	const [itemDetails, setItemDetails] = useState({
		id: null,
		name,
		img,
		price: prices[0],
		flavors,
		add_ons,
		add_on: null,
		flavor: flavors ? flavors[0]?.name : null,
		quantity: 1
	})

	useEffect(() => {
		id &&
			setItemDetails({
				id,
				name,
				img,
				price: prices[0],
				flavors,
				add_ons,
				add_on: null,
				flavor: flavors ? flavors[0]?.name : null,
				quantity: 1
			})
	}, [isOpen.product])

	const [alignment, setAlignment] = useState(prices[0])

	useEffect(() => {
		console.log(prices)
		setAlignment(prices[0])
	}, [prices])

	const handleChange = (event, column) => {
		const val = event.target.value
		setItemDetails({
			...itemDetails,
			id: `${itemDetails.name.split(" ").join("_")}~${column === "flavor" ? event.target.value : itemDetails.flavor}~${
				column === "add_on" ? val : itemDetails.add_on
			}~${alignment}`,
			[column]: column === "quantity" ? parseInt(event.target.value) : event.target.value
		})
	}

	const handleAlignment = (event, newAlignment) => {
		if (newAlignment !== null) {
			setItemDetails({
				...itemDetails,
				price: newAlignment,
				id: `${itemDetails.name.split(" ").join("_")}~${itemDetails.flavor}~${itemDetails.add_on}~${alignment}`
			})
			setAlignment(newAlignment)
		}
	}

	const handleAddToCart = () => {
		console.log({ itemDetails })
		setShowNotif(true)
		setCart(cart => [
			...cart,
			{
				...itemDetails,
				id: `${itemDetails.name.split(" ").join("_")}~${itemDetails.flavor}~${itemDetails.add_on}~${alignment}`
			}
		])
	}

	return (
		<>
			{/* <Notification item={itemDetails} showNotif={showNotif} /> */}
			<Modal
				open={isOpen.status}
				onClose={() => setIsOpen({ product: null, status: !isOpen.status })}
				sx={{ zIndex: 1 }}
			>
				<section className="product-modal">
					<Grid container>
						<Grid item xs={12}>
							<div className="product-img-wrapper modal">
								<img style={{ width: "100%" }} src={img} alt="" />
							</div>
						</Grid>
						<Grid item xs={12} sx={{ p: 2 }}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								<strong>{name}</strong>
							</Typography>

							<Box fullWidth>
								<Typography variant="subtitle2">Price</Typography>
								<ToggleButtonGroup
									fullWidth
									value={alignment}
									exclusive
									onChange={handleAlignment}
									size="small"
									color="primary"
								>
									{/* ₱ */}
									{prices.map((price, idx) => {
										return (
											<ToggleButton key={idx} value={price} aria-label="center">
												<CurrencyRuble />
												<Typography variant="h6">{price}.00</Typography>
											</ToggleButton>
										)
									})}
								</ToggleButtonGroup>
							</Box>

							<Box sx={{ mt: 2 }}>
								{flavors && (
									<>
										<FormControl fullWidth>
											<InputLabel id="flavor">Flavor</InputLabel>
											<Select
												fullWidth
												sx={{ mb: 1 }}
												label="Flavor"
												id="flavor"
												onChange={e => handleChange(e, "flavor")}
												value={itemDetails.flavor}
											>
												{flavors?.map(flavor => {
													return (
														<MenuItem key={flavor.id} value={flavor.name}>
															{flavor.name}
														</MenuItem>
													)
												})}
											</Select>
										</FormControl>
									</>
								)}
								<TextField
									label="Quantity"
									id="quantity"
									sx={{ mt: 1 }}
									fullWidth
									type="number"
									variant="outlined"
									onChange={e => handleChange(e, "quantity")}
									value={itemDetails.quantity}
								/>
							</Box>
						</Grid>

						<Grid item xs={12} sx={{ p: 2 }}>
							<Button
								onClick={handleAddToCart}
								variant="contained"
								color="warning"
								fullWidth
								startIcon={<ShoppingCart />}
							>
								Add to cart
							</Button>
						</Grid>
					</Grid>
				</section>
			</Modal>
		</>
	)
}

export default ProductModal
