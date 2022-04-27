import React, {useState, useEffect, useContext} from "react"
import {Grid, Button} from "@mui/material"
import {menu} from "../../data"
import ProductCard from "./product.card"
import {AppCtx} from "../../App"
import ProductModal from "./product.modal"
import {ArrowForwardIos} from "@mui/icons-material"

const Products = ({title, products = []}) => {
	const [isOpen, setIsOpen] = useState({product: null, status: false})
	const {setCart, data = [], setIsProductOpen, setIndex, setViewMoreData} = useContext(AppCtx)

	useEffect(() => {
		setIsProductOpen(isOpen.status)
	}, [isOpen])

	useEffect(() => {
		console.log({isOpen})
	}, [isOpen])

	return (
		<div>
			<ProductModal isOpen={isOpen} setCart={setCart} setIsOpen={setIsOpen} />
			<Grid container sx={{alignItems: "center", mt: 2}}>
				<Grid item xs={12} sx={{padding: "0 1rem"}}>
					<Grid container>
						<Grid item xs={10}>
							<h3 style={{margin: 0}}>{title}</h3>
						</Grid>
						{/* <Grid item xs={2}>
							{products.length > 3 && <small>Show all</small>}
						</Grid> */}
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
						{products?.slice(0, 6).map(m => {
							return (
								<Grid
									key={m.id}
									item
									xs={6}
									sx={{ml: 2}}
									// onClick={() => setIsOpen({ status: !isOpen.status, product: m })}
								>
									<ProductCard product={m} setIsOpen={setIsOpen} />
								</Grid>
							)
						})}

						{products.length > 6 && (
							<Grid item xs={6} sx={{ml: 2}}>
								<Button
									variant="text"
									color="inherit"
									sx={{height: "100%", width: 100, display: "block", textTransform: "capitalize"}}
									disableElevation
									onClick={() => {
										setIndex(1)
										setViewMoreData({products, title})
									}}
									size="small"
								>
									<div>
										<ArrowForwardIos />
									</div>
									See All
								</Button>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Products
