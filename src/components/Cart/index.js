import React, { useContext } from "react"
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
import { Add, Close, Delete, Remove } from "@mui/icons-material"
import { AppCtx } from "./../../App"

const CartModal = () => {
	const { cart, isCartOpen, setIsCartOpen, setCart } = useContext(AppCtx)

	const handleChange = (event, column, item) => {
		const updated_cart = cart.map(cart_item => {
			if (cart_item.id === item.id && cart_item.price === item.price && cart_item.flavor === item.flavor) {
				return {
					...item,
					[column]: column === "quantity" ? parseInt(event.target.value) : event.target.value
				}
			}

			return cart_item
		})
		setCart(updated_cart)
	}

	return (
		<Modal open={isCartOpen} onClose={() => setIsCartOpen(!isCartOpen)} sx={{ border: "none !important" }}>
			<div className="product-modal cart">
				{cart.length <= 0 && <div>No Item</div>}
				{cart.map(item => {
					console.log({ item })
					return (
						<section key={item.id} style={{ marginBottom: 10 }}>
							<Box sx={{ overflow: "hidden", border: "1px solid #ccc", borderRadius: ".5rem" }}>
								<Grid container>
									<Grid item xs={3}>
										<div className="item-img-wrapper">
											<img src={item.img} alt="" className="item-img" />
										</div>
									</Grid>
									<Grid item xs={9} sx={{ p: 1 }}>
										<Grid container>
											<Grid item xs={11}>
												{item.name}
											</Grid>
											<Grid item xs={1}>
												<Close fontSize="small" />
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
												<div style={{ color: "orangered" }}>
													<strong>₱{item.price}</strong>
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
														<Remove />
													</Grid>
													<Grid xs={6}>
														<input type="number" className="quantity-input" value={item.quantity}></input>
													</Grid>
													<Grid item xs={3} alignItems="center" display="flex">
														<Add />
													</Grid>
												</Grid>
											</Grid>

											<Grid item xs={3}>
												<small style={{ color: "#ccc", fontSize: "10px" }}>Subtotal</small>
												<div style={{ color: "orangered" }}>
													<strong>₱{item.quantity * item.price + (item.add_on ? 10 : 0)}</strong>
												</div>
											</Grid>
										</Grid>
										{/* <div>Subtotal: {item.quantity * item.price}</div> */}
									</Grid>
								</Grid>
							</Box>
						</section>
					)
				})}
			</div>
		</Modal>
	)
}

export default CartModal
