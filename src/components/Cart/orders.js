import React from "react"
import { useContext } from "react"
import { CartCtx } from "./index"
import moment from "moment"
import { Box, Button, Grid } from "@mui/material"

const Orders = () => {
	const { orders, customerInfo, setCart } = useContext(CartCtx)
	return (
		<section style={{ marginTop: 10 }} className="order-wrapper">
			{orders
				.filter(order => order.customer.name === customerInfo.name)
				.sort((a, b) => b.date_created.localeCompare(a.date_created))
				.map(order => {
					console.log({ order })
					return <OrderDetails order={order} />
				})}
		</section>
	)
}

const OrderDetails = ({ order }) => {
	const { setCart, setTab } = useContext(CartCtx)
	const { cart, customer, date_created, total, status } = order
	return (
		<section className="order-details">
			<Grid container className="top">
				<Grid item xs={9}>
					{moment(date_created).calendar()}
				</Grid>
				<Grid item xs={3} className="status">
					<small>{status}</small>
				</Grid>
			</Grid>

			<Grid container className="item">
				<Grid xs={2}>
					<div className="thumb-wrapper">
						<img style={{ width: "100%" }} src={cart[0].thumb} alt="" />
					</div>
				</Grid>
				<Grid xs={10}>
					<Grid container>
						<Grid item xs={10}>
							{cart[0].name}
						</Grid>
						<Grid item xs={2} textAlign="right">
							x {cart[0].quantity}
							<div style={{ marginTop: 4, color: "#999" }}>₱{cart[0].price * cart[0].quantity}</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{cart.length > 1 && (
				<Grid container>
					<Grid item xs={12} sx={{ borderBottom: "1px solid #ccc" }}>
						<Button
							variant="text"
							size="small"
							fullWidth
							onClick={() => {
								setCart(cart)
								setTab("cart")
							}}
						>
							View other items
						</Button>
					</Grid>
				</Grid>
			)}

			<Grid container className="quantity">
				<Grid item xs={3}>
					<small>
						{cart.length} item{cart.length > 1 ? "s" : ""}
					</small>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={6} textAlign="right">
					<small>Order Total: ₱{total}</small>
				</Grid>
			</Grid>
		</section>
	)
}

export default Orders
