import {ArrowBackIosNew} from "@mui/icons-material"
import {Button, Grid} from "@mui/material"
import React, {useContext, useEffect, useState} from "react"
import {AppCtx} from "../App"
import ProductCard from "../components/Menu/product.card"
import ProductModal from "../components/Menu/product.modal"

const ViewMore = () => {
	const [isOpen, setIsOpen] = useState({product: null, status: false})
	const {setIndex, viewMoreData, setIsProductOpen, setCart, isCartOpen, isProductOpen, infoSaved} = useContext(AppCtx)

	useEffect(() => {
		console.log({isOpen})
	}, [isOpen])
	useEffect(() => {
		console.log({viewMoreData})
	}, [viewMoreData])

	useEffect(() => {
		setIsProductOpen(isOpen.status)
	}, [isOpen])

	return (
		<section
			className={isCartOpen || isProductOpen || !infoSaved ? "view-all-wrapper blr blur" : "view-all-wrapper blr"}
		>
			<ProductModal isOpen={isOpen} setCart={setCart} setIsOpen={setIsOpen} />

			<div className={`top ${viewMoreData.title === "Best Sellers" ? "best" : ""}`}>
				<Button startIcon={<ArrowBackIosNew />} color="inherit" onClick={() => setIndex(0)}>
					Back
				</Button>
				<div style={{textAlign: "center", width: "60%"}}>
					<strong>{viewMoreData.title}</strong>
				</div>
			</div>

			<div className="products-wrapper">
				<Grid container spacing={3} padding={2}>
					{viewMoreData.products?.map(m => {
						return (
							<Grid
								key={m.id}
								item
								xs={6}
								// sx={{m: 1}}
								// onClick={() => setIsOpen({ status: !isOpen.status, product: m })}
							>
								<ProductCard product={m} setIsOpen={setIsOpen} />
							</Grid>
						)
					})}
				</Grid>
			</div>
		</section>
	)
}

export default ViewMore
