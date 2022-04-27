import React, {useContext} from "react"
import {Button, Grid, Paper, Rating} from "@mui/material"
import {AppCtx} from "../../App"

const ProductCard = ({product, setIsOpen}) => {
	const {setCart, cart} = useContext(AppCtx)
	return (
		<Paper
			id="product-card"
			sx={{
				width: "100%",
				height: "100%",
				overflow: "hidden",
				borderRadius: 3,
				minWidth: "140px",
				boxShadow: "0 5px 10px rgba(0,0,0,.1)"
			}}
		>
			<Grid container>
				<Grid item xs={12}>
					<div onClick={() => setIsOpen(isOpen => ({status: !isOpen.status, product}))}>
						<div
							style={{
								width: "100%",
								height: "100px",
								overflow: "hidden",
								position: "relative"
							}}
						>
							<img
								style={{
									width: "110%",
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)"
								}}
								src={product.thumb}
								alt=""
							/>
						</div>
						<div className="product-details">
							<Rating name="read-only" value={4.5} readOnly size="small" precision={0.5} />
							<h6 className="product-name card-name" style={{marginBottom: "5px", minHeight: 24}}>
								{product.name}
							</h6>
							<h4 className="product-price">
								₱{product.price[0]}.00{" "}
								{product.is_best_seller && <small className="best-seller small">Best Seller</small>}
							</h4>
						</div>
					</div>
					<div style={{padding: "0 14px 14px"}}>
						<Button
							variant="contained"
							size="small"
							color={product.is_best_seller ? "error" : "warning"}
							fullWidth
							disableElevation
							disabled={!product.is_available}
							onClick={() =>
								setCart([
									...cart,
									{
										...product,
										selected_price: product.price[0],
										quantity: 1,
										flavor: product.flavors ? product.flavors[0]?.name : null
									}
								])
							}
						>
							{product.is_available ? "Add to cart" : <small>Not Available</small>}
						</Button>
					</div>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ProductCard
