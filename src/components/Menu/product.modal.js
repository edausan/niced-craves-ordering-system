import React, {useState, useEffect, useContext} from "react"

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
	ToggleButton,
	Rating
} from "@mui/material"
import {ShoppingCart, CurrencyRuble, Star} from "@mui/icons-material"
import Notification from "./notification"
import {AppCtx} from "../../App"

const ProductModal = ({isOpen, setIsOpen, setCart}) => {
	const {setShowNotif} = useContext(AppCtx)

	const [itemDetails, setItemDetails] = useState(
		isOpen.product
			? isOpen.product
			: {
					id: null,
					name: null,
					thumb: null,
					sizes: [],
					flavors: [],
					add_ons: [],
					price: [],
					is_available: true,
					sauce: null,
					flavor: null
			  }
	)
	const {name, thumb, price, id, sizes, flavors, add_ons, is_available, is_best_seller, sauces, sauce, selected_price} =
		itemDetails
	const [alignment, setAlignment] = useState(sizes?.length > 0 ? sizes[0].price : price[0])
	const [selectedSauce, setSelectedSauce] = useState(sauce)

	useEffect(() => {
		console.log({UPDATE: itemDetails})
	}, [itemDetails])

	useEffect(() => {
		console.log(isOpen.product)
		if (isOpen.product?.id) {
			const selected_price =
				isOpen.product?.sizes?.length > 0 ? isOpen.product?.sizes[0].price : isOpen.product?.price[0]
			const item_details = {
				...isOpen.product,
				selected_price,
				sauce: isOpen.product?.sauces?.length > 0 ? isOpen.product?.sauces[0] : null,
				flavor: flavors ? flavors[0]?.name : null,
				quantity: 1,
				id: handleId({...isOpen.product, selected_price})
			}
			console.log({USE_EFFECT: item_details})
			setItemDetails(item_details)
		}
	}, [isOpen.product])

	useEffect(() => {
		console.log(price)
		setAlignment(price[0])
	}, [price])

	const handleId = itemDetails => {
		console.log({itemDetails})
		const _id = `${itemDetails?.name?.split(" ").join("_")}_F:${itemDetails.flavor || null}_A:${
			itemDetails.add_on ? itemDetails.add_on : null
		}_P:${itemDetails.selected_price}_S:${itemDetails.sauce}`
		return _id
	}

	const handleChange = (event, column) => {
		const val = event.target.value
		setItemDetails({
			...itemDetails,
			id: `${itemDetails.name.split(" ").join("_")}_F:${
				column === "flavor" ? event.target.value : itemDetails.flavor
			}_A:${column === "add_on" ? val : itemDetails.add_on ? itemDetails.add_on : null}_P:${
				itemDetails.selected_price
			}_S:${sauce}`,
			[column]: column === "quantity" ? parseInt(val) : val
		})
	}

	const handleAlignment = (e, price) => {
		if (price !== null) {
			setItemDetails({
				...itemDetails,
				selected_price: price,
				id: handleId({...itemDetails, selected_price: price})
			})
			setAlignment(price)
		}
	}

	const handleSauce = (e, sauce) => {
		if (sauce !== null) {
			setItemDetails({
				...itemDetails,
				sauce,
				id: handleId({...itemDetails, sauce})
			})
		}
	}

	const handleRice = (e, rice) => {
		if (itemDetails.with_rice !== null) {
			setItemDetails({
				...itemDetails,
				rice,
				id: handleId({...itemDetails, sauce})
			})
		}
	}

	const handleAddToCart = () => {
		console.log({itemDetails})
		setShowNotif(true)
		setCart(cart => [
			...cart,
			{
				...itemDetails,
				id: handleId(itemDetails)
			}
		])
	}

	return (
		<>
			{/* <Notification item={itemDetails} showNotif={showNotif} /> */}
			<Modal open={isOpen.status} onClose={() => setIsOpen({product: null, status: !isOpen.status})} sx={{zIndex: 1}}>
				<section className="product-modal">
					<Grid container>
						<Grid item xs={12}>
							<div className="product-img-wrapper modal">
								<img src={thumb} alt="" />
							</div>
						</Grid>
						<Grid item xs={12} sx={{p: 2, pt: 1}}>
							<Typography variant="h5" sx={{mb: 2}}>
								<div>
									<Rating name="read-only" value={4.5} readOnly size="small" precision={0.5} />
									{is_best_seller && <span className="best-seller">Best Seller</span>}
								</div>
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
									disabled={(sizes?.length > 0 ? [...sizes] : [...price]).length <= 0}
								>
									{/* ??? */}
									{(sizes?.length > 0 ? [...sizes] : [...price]).map((price, idx) => {
										return (
											<ToggleButton
												key={idx}
												value={sizes?.length > 0 ? price.price : price}
												aria-label="center"
												sx={{display: "block"}}
											>
												{sizes?.length > 0 && (
													<div>
														<small>{price.name}</small>
													</div>
												)}
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center"
													}}
												>
													<CurrencyRuble />
													<Typography variant="h6">{sizes?.length > 0 ? price.price : price}.00</Typography>
												</div>
											</ToggleButton>
										)
									})}
								</ToggleButtonGroup>
							</Box>

							{itemDetails.sauces && (
								<Box fullWidth>
									<Typography variant="subtitle2">Sauces</Typography>
									<ToggleButtonGroup
										fullWidth
										value={sauce}
										exclusive
										onChange={handleSauce}
										size="small"
										color="primary"
									>
										{/* ??? */}
										{itemDetails.sauces?.map((s, idx) => {
											return (
												<ToggleButton key={idx} value={s} aria-label="center">
													<Typography variant="subtitle2">{s}</Typography>
												</ToggleButton>
											)
										})}
									</ToggleButtonGroup>
								</Box>
							)}
							{itemDetails.with_rice && (
								<Box fullWidth>
									<Typography variant="subtitle2">Rice</Typography>
									<ToggleButtonGroup
										fullWidth
										value={itemDetails.rice ? itemDetails.rice : "w-rice"}
										exclusive
										onChange={handleRice}
										size="small"
										color="primary"
									>
										<ToggleButton value="w-rice" aria-label="center">
											<Typography variant="subtitle2">With rice</Typography>
										</ToggleButton>
										<ToggleButton value="no-rice" aria-label="center">
											<Typography variant="subtitle2">W/o rice</Typography>
										</ToggleButton>
									</ToggleButtonGroup>
								</Box>
							)}

							<Box sx={{mt: 2}}>
								{flavors && (
									<>
										<FormControl fullWidth>
											<InputLabel id="flavor">Flavor</InputLabel>
											<Select
												fullWidth
												sx={{mb: 1}}
												label="Flavor"
												id="flavor"
												onChange={e => handleChange(e, "flavor")}
												value={itemDetails.flavor}
											>
												{flavors?.map(flavor => {
													return (
														<MenuItem key={flavor.id} value={flavor.name} disabled={!flavor.is_available}>
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
									sx={{mt: 1}}
									fullWidth
									type="number"
									variant="outlined"
									onChange={e => handleChange(e, "quantity")}
									value={itemDetails.quantity}
									defaultValue={1}
									inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
									onBlur={() =>
										setItemDetails({
											...itemDetails,
											quantity: itemDetails.quantity === 0 ? 1 : itemDetails.quantity
										})
									}
								/>
							</Box>
						</Grid>

						<Grid item xs={12} sx={{p: 2}}>
							<Grid container>
								<Grid item xs={4} md={4} alignItems="center" justifyContent="center" display="flex">
									<strong style={{fontSize: 24}}>
										???{" "}
										{(isNaN(itemDetails.quantity) ? 1 : itemDetails.quantity) * selected_price -
											(itemDetails.rice === "no-rice" ? 5 * itemDetails.quantity : 0)}
									</strong>
								</Grid>

								<Grid item xs={8} md={8}>
									<Button
										onClick={handleAddToCart}
										variant="contained"
										color={is_best_seller ? "error" : "warning"}
										fullWidth
										startIcon={<ShoppingCart />}
										disabled={!is_available}
										disableElevation
									>
										{is_available ? "Add to cart" : "Not Available"}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</section>
			</Modal>
		</>
	)
}

export default ProductModal
