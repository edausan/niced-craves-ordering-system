import React, { useState, useEffect, useContext } from "react"
import { Grid } from "@mui/material"
import { menu } from "../../data"
import ProductCard from "./product.card"
import { AppCtx } from "../../App"
import ProductModal from "./product.modal"

const BestSeller = () => {
	const [isOpen, setIsOpen] = useState({ product: null, status: false })
	const { setCart } = useContext(AppCtx)

	useEffect(() => {
		console.log({ isOpen })
	}, [isOpen])

	return (
		<div>
			<ProductModal isOpen={isOpen} setCart={setCart} setIsOpen={setIsOpen} />
			<Grid container sx={{ alignItems: "center", mt: 2 }}>
				<Grid item xs={12} sx={{ padding: "0 1rem" }}>
					<Grid container>
						<Grid item xs={10}>
							<h3 style={{ margin: 0 }}>Best Seller</h3>
						</Grid>
						<Grid item xs={2}>
							<small>Show all</small>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Grid
						container
						sx={{
							alignItems: "stretch",
							flexWrap: "unset",
							maxWidth: "100%",
							overflowX: "auto",
							padding: "20px 0",
							paddingRight: "20px"
						}}
					>
						{menu.map(m => {
							return (
								<Grid
									key={m.id}
									item
									xs={6}
									sx={{ ml: 2 }}
									onClick={() => setIsOpen({ status: !isOpen.status, product: m })}
								>
									<ProductCard product={m} />
								</Grid>
							)
						})}
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default BestSeller
