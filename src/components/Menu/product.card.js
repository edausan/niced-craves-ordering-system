import React from "react"
import { Button, Grid, Paper } from "@mui/material"

const ProductCard = ({ product, setIsOpen }) => {
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
					<div onClick={() => setIsOpen(isOpen => ({ status: !isOpen.status, product }))}>
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
							<h6 className="product-name card-name" style={{ marginBottom: "5px", minHeight: 24 }}>
								{product.name}
							</h6>
							<h4 className="product-price">
								₱{product.price[0]}.00 {product.is_best_seller && <small className="best-seller">Best Seller</small>}
							</h4>
						</div>
					</div>
					<div style={{ padding: "0 14px 14px" }}>
						<Button variant="contained" size="small" color="warning" fullWidth>
							Add to cart
						</Button>
					</div>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ProductCard
