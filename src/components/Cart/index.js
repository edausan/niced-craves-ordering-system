import React, { useContext, useEffect, useState } from "react"
import {
	Grid,
	Modal,
	Paper,
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Button,
	ButtonGroup,
	TextField,
	Box
} from "@mui/material"
import { Add, Close, Delete, Remove, ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material"
import { AppCtx } from "./../../App"

const CartModal = () => {
	const { cart, isCartOpen, setIsCartOpen, setCart, setIsCartUpdated } = useContext(AppCtx)
	const [quantity, setQuantity] = useState({ item: "", value: 1 })
	const [deleted, setDeleted] = useState({ item: null, status: false })

	useEffect(() => {
		console.log({ quantity })
		handleChange(null, "quantity", quantity.item)
	}, [quantity])

	const handleChange = (event, column, item) => {
		const updated_cart = cart.map(cart_item => {
			if (cart_item.id === item.id) {
				console.log({ quantity })
				return {
					...item,
					id: `${item.name?.split(" ").join("_")}~${column === "flavor" ? event.target.value : item.flavor}~${
						column === "add_on" ? event.target.value : item.add_on
					}~${item.price}`,
					[column]:
						column === "quantity"
							? quantity.item.id === item.id
								? quantity.value > 0
									? quantity.value
									: item.quantity
								: item.quantity
							: event.target.value
				}
			}

			// parseInt(event.target?.value || event > 0 ? event : 1)

			return cart_item
		})
		setIsCartUpdated(true)
		setCart(updated_cart)
	}

	useEffect(() => {
		console.log({ deleted })
		setTimeout(() => {
			deleted.status && handleDeleteItem(deleted.item)
		}, 300)
	}, [deleted])

	const handleDeleteItem = item => {
		const filtered = cart.filter(c_item => c_item.id !== item.id)
		setCart(filtered)
		setDeleted({ item: null, status: false })
	}

	return (
		<Modal open={isCartOpen} onClose={() => setIsCartOpen(!isCartOpen)} sx={{ border: "none !important" }}>
			<div className="product-modal cart">
				<div style={{ textAlign: "right", marginBottom: "10px" }}>
					{cart.length > 0 && (
						<Button onClick={() => setCart([])} variant={cart.length <= 0 ? "text" : "outlined"} size="small">
							Clear Cart
						</Button>
					)}
				</div>

				<section>
					{cart.length <= 0 && (
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							fullWidth
							flexDirection="column"
							sx={{ minHeight: cart.length > 0 ? "calc(100% - 50px)" : "100%" }}
						>
							<ShoppingCartOutlined sx={{ fontSize: "50px", mb: 2 }} color="warning" />
							<strong style={{ color: "#ed6c02" }}>Your cart is empty.</strong>
						</Grid>
					)}
					{cart.map(item => {
						// console.log({ item })
						return (
							<section
								key={item.id}
								style={{ marginBottom: 5 }}
								className={`cart-item${deleted.item?.id === item.id && deleted.status ? " delete" : ""}`}
							>
								<Box sx={{ overflow: "hidden", border: "1px solid #ccc", borderRadius: ".5rem" }}>
									<Grid container>
										<Grid item xs={3}>
											<div className="item-img-wrapper">
												<img src={item.thumb} alt="" className="item-img" />
											</div>
										</Grid>
										<Grid item xs={9} sx={{ p: 1 }}>
											<Grid container sx={{ mb: 1 }}>
												<Grid item xs={11}>
													{item.name}
												</Grid>
												<Grid item xs={1} justifyContent="right" display="flex" alignItems="start">
													<Close
														sx={{ fontSize: 12, color: "#ccc" }}
														onClick={() => setDeleted({ item, status: true })}
													/>
												</Grid>
											</Grid>

											<Grid container fullWidth spacing={1}>
												{item.flavor && (
													<Grid item xs={item.add_ons ? 7 : 12}>
														<small style={{ color: "#ccc", fontSize: "10px" }}>Flavor</small>
														<Select
															fullWidth
															sx={{ mb: 1, "&::before": { border: "none" }, fontSize: "12px" }}
															id="flavor"
															onChange={e => handleChange(e, "flavor", item)}
															value={item.flavor}
															size="small"
															variant="filled"
														>
															{item.flavors?.map(flavor => {
																return (
																	<MenuItem key={flavor.id} value={flavor.name} sx={{ pt: 1 }}>
																		{flavor.name}
																	</MenuItem>
																)
															})}
														</Select>
													</Grid>
												)}
												{item.add_ons && (
													<Grid item xs={5}>
														<small style={{ color: "#ccc", fontSize: "10px" }}>Add ons</small>
														<Select
															fullWidth
															sx={{ mb: 1, "&::before": { border: "none" }, fontSize: "12px" }}
															id="flavor"
															onChange={e => handleChange(e, "add_on", item)}
															value={item.add_on}
															size="small"
															variant="filled"
														>
															<MenuItem key={"none"} value={null}>
																None
															</MenuItem>
															{item.add_ons?.map(add => {
																return (
																	<MenuItem key={add.id} value={add.name} sx={{ pt: 1 }}>
																		{add.name}
																	</MenuItem>
																)
															})}
														</Select>
													</Grid>
												)}
											</Grid>

											<Grid container justifyItems="center">
												<Grid item xs={3}>
													<small style={{ color: "#ccc", fontSize: "10px" }}>Price</small>
													<div style={{ color: "orangered", marginTop: 3 }}>
														<strong>₱{item.selected_price}</strong>
													</div>
												</Grid>

												<Grid item xs={6}>
													<small style={{ color: "#ccc", fontSize: "10px" }}>Quantity</small>
													<Grid
														className="quantity-wrapper"
														container
														alignItems="center"
														sx={{ border: "1px solid #ccc", borderRadius: "3px", width: "90px" }}
													>
														<Grid item xs={3} alignItems="center" display="flex">
															<Remove
																onClick={
																	item.quantity > 0
																		? () =>
																				setQuantity({
																					item,
																					value: item.quantity - 1
																				})
																		: () => {}
																}
															/>
														</Grid>
														<Grid xs={6}>
															<input
																type="number"
																className="quantity-input"
																value={item.id === quantity.id ? quantity.value : item.quantity}
																onClick={e =>
																	setQuantity({
																		item,
																		value: parseInt(e.target.value)
																	})
																}
															></input>
														</Grid>
														<Grid item xs={3} alignItems="center" display="flex">
															<Add
																onClick={() =>
																	setQuantity({
																		item,
																		value: item.quantity + 1
																	})
																}
															/>
														</Grid>
													</Grid>
												</Grid>

												<Grid item xs={3}>
													<small style={{ color: "#ccc", fontSize: "10px" }}>Subtotal</small>
													<div style={{ color: "orangered", marginTop: 3 }}>
														<strong>
															₱
															{item.quantity * item.selected_price +
																(item.add_on ? 10 * item.quantity : 0) -
																(item.rice === "no-rice" ? 5 : 0)}
														</strong>
													</div>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Box>
							</section>
						)
					})}
				</section>
				<Grid container fullWidth>
					<Grid item xs={8}>
						Total:
					</Grid>
					<Grid item xs={4}>
						<Button fullWidth variant="contained" color="warning" sx={{ mt: 1 }}>
							Checkout
						</Button>
					</Grid>
				</Grid>
			</div>
		</Modal>
	)
}

export default CartModal
