import {AddShoppingCart} from "@mui/icons-material"
import {Button, Grid} from "@mui/material"
import React, {useContext} from "react"
import SwipeableViews from "react-swipeable-views"
import {autoPlay} from "react-swipeable-views-utils"
import {AppCtx} from "../../App"
import {menu} from "../../data"
import SummerLogo from "../../images/summer_logo.png"
import WhiteLogo from "../../images/white_logo.png"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Swipeable = () => {
	const {products, setCart, cart, isCartOpen, isProductOpen, infoSaved} = useContext(AppCtx)
	return (
		<div className={isCartOpen || isProductOpen || !infoSaved ? "blr blur" : "blr"}>
			<section className="swipeable-wrapper">
				<div
					style={{
						position: "absolute",
						top: 20,
						left: "50%",
						transform: "translateX(-50%)",
						zIndex: 1100,
						width: "50%"
					}}
				>
					<img src={WhiteLogo} alt="" style={{width: "100%"}} />
				</div>
				<AutoPlaySwipeableViews height={500} autoPlay={false}>
					{products?.map((m, idx) => {
						return (
							<div
								key={idx}
								// style={{ ...styles.slide }}
								className="carousel-img-wrapper"
							>
								<div className="carousel-product-description">
									<Grid container spacing={1}>
										<Grid item xs={10}>
											<h1 className="product-name">{m.name}</h1>
											<h2 className="product-price">₱{m.price[0]}.00</h2>
										</Grid>
										<Grid item xs={2} alignItems="center" display="flex">
											<Button
												variant="text"
												color="inherit"
												disableElevation
												onClick={() =>
													setCart([
														...cart,
														{
															...m,
															selected_price: m.price[0],
															quantity: 1,
															flavor: m.flavors ? m.flavors[0]?.name : null
														}
													])
												}
											>
												<AddShoppingCart />
											</Button>
										</Grid>
									</Grid>
								</div>
								<img src={m.thumb} alt="" />
							</div>
						)
					})}
				</AutoPlaySwipeableViews>
			</section>
		</div>
	)
}

export default Swipeable
