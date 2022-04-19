import {ArrowBackIosNew, ArrowForwardIos} from "@mui/icons-material"
import {Button, Grid} from "@mui/material"
import React, {useContext, useEffect, useState} from "react"
import {AppCtx} from "../App"
import ProductCard from "../components/Menu/product.card"
import ProductModal from "../components/Menu/product.modal"

const ViewMore = () => {
	const [isOpen, setIsOpen] = useState({product: null, status: false})
	const {setIndex, viewMoreData, setIsProductOpen, setCart, isCartOpen, isProductOpen, infoSaved, index} =
		useContext(AppCtx)

	const [top, setTop] = useState(false)
	const [showToTop, setShowToTop] = useState(false)

	useEffect(() => {
		setIsProductOpen(isOpen.status)
	}, [isOpen])

	useEffect(() => {
		const wrapper = document.querySelector("#grid-0")
		index === 0 && wrapper?.scrollIntoView(true)
	}, [index])

	useEffect(() => {
		const wrapper = document.querySelector("#grid-0")
		top && wrapper?.scrollIntoView({behavior: "smooth", block: "start"})
	}, [top])

	useEffect(() => {
		const wrapper = document.querySelector(".products-wrapper")
		wrapper.addEventListener("scroll", e => {
			if (e.target.scrollTop > 10) {
				setShowToTop(true)
			} else {
				setShowToTop(false)
				setTop(false)
			}
		})
	}, [])

	return (
		<section
			className={
				isCartOpen || isProductOpen || !infoSaved || index === 0 ? "view-all-wrapper blr blur" : "view-all-wrapper blr"
			}
		>
			<ProductModal isOpen={isOpen} setCart={setCart} setIsOpen={setIsOpen} />

			<div className={`top ${viewMoreData.title === "Best Sellers" ? "best" : ""}`}>
				<Button startIcon={<ArrowBackIosNew />} color="inherit" onClick={() => setIndex(0)}>
					Back
				</Button>
				<div style={{textAlign: "center", marginLeft: -77, width: "100%"}}>
					<strong>{viewMoreData.title}</strong>
				</div>
			</div>

			<div className="products-wrapper">
				<Grid container spacing={3} padding={2}>
					{viewMoreData.products?.map((m, idx) => {
						return (
							<Grid id={`grid-${idx}`} key={m.id} item xs={6}>
								<ProductCard product={m} setIsOpen={setIsOpen} />
							</Grid>
						)
					})}
				</Grid>
			</div>

			<Button
				sx={{position: "fixed", bottom: 15, right: 10, pt: 2, pb: 2}}
				onClick={() => setTop(true)}
				variant="contained"
				color="error"
				className={showToTop ? "to-top show" : "to-top"}
			>
				<ArrowForwardIos sx={{transform: "rotate(-90deg)"}} />
			</Button>
		</section>
	)
}

export default ViewMore
