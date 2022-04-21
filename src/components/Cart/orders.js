import {useContext, useState} from "react"
import {CartCtx} from "./index"
import moment from "moment"
import {Box, Button, Grid, ListItemButton, ListItemIcon, Collapse, ListItemText, Divider} from "@mui/material"
import {Fastfood, ExpandLess, ExpandMore} from "@mui/icons-material"
import {grey} from "@mui/material/colors"

const Orders = () => {
	const {orders, customerInfo, setCart} = useContext(CartCtx)
	return (
		<section style={{marginTop: 10}} className="order-wrapper">
			{orders
				.filter(order => order.customer.name === customerInfo.name)
				.sort((a, b) => b.date_created.localeCompare(a.date_created))
				.map(order => {
					console.log({order})
					return <OrderDetails order={order} />
				})}
		</section>
	)
}

const OrderDetails = ({order}) => {
	const {id} = order
	const {setCart, setTab} = useContext(CartCtx)
	const {cart, customer, date_created, total, status} = order
	const [open, setOpen] = useState({status: false, id: null})

	console.log({filtered: cart.slice(0, -1)})

	return (
		<section className="order-details">
			<Grid container className="top">
				<Grid item xs={6}>
					<small>{moment(date_created).calendar()}</small>
				</Grid>
				<Grid item xs={6} className="status">
					<small>{status}</small>
				</Grid>
			</Grid>

			<Grid container className="item">
				<Grid xs={2}>
					<div className="thumb-wrapper">
						<img style={{width: "100%"}} src={cart[0].thumb} alt="" />
					</div>
				</Grid>
				<Grid xs={10}>
					<Grid container alignItems="center">
						<Grid item xs={10}>
							{cart[0].name}
						</Grid>
						<Grid item xs={2} textAlign="right">
							x {cart[0].quantity}
							<div style={{marginTop: 4, color: "#999"}}>₱{cart[0].price * cart[0].quantity}</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{cart.length > 1 && (
				<>
					<ListItemButton
						sx={{pl: 1, pr: 1, background: open.status && open.id === id ? grey["200"] : "inherit"}}
						onClick={() => setOpen({status: !open.status, id})}
						size="small"
					>
						<ListItemIcon sx={{minWidth: 45, pl: 1}}>
							<Fastfood fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="View other items" />
						{open.status && open.id === id ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={open.status && open.id === id} timeout="auto" unmountOnExit>
						{cart.slice(1, cart.length).map(c => {
							console.log({cart: cart.slice(1, 0)})
							return (
								<Grid container className="item">
									<Grid xs={2}>
										<div className="thumb-wrapper">
											<img style={{width: "100%"}} src={c.thumb} alt="" />
										</div>
									</Grid>
									<Grid xs={10}>
										<Grid container alignItems="center">
											<Grid item xs={10}>
												{c.name}
											</Grid>
											<Grid item xs={2} textAlign="right">
												x {c.quantity}
												<div style={{marginTop: 4, color: "#999"}}>₱{c.price * c.quantity}</div>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							)
						})}
					</Collapse>
					<Divider />
				</>
			)}

			{/* {cart.length > 1 && (
				<Grid container>
					<Grid item xs={12} sx={{borderBottom: "1px solid #ccc"}}>
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
			)} */}

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
