import { AddShoppingCart } from "@mui/icons-material"
import { Divider, Grid } from "@mui/material"
import React from "react"

const Notification = ({ item, showNotif }) => {
	return (
		<section className={`notification ${showNotif ? "show" : ""}`}>
			<Grid container alignItems="center">
				<Grid item xs={2}>
					<AddShoppingCart color="warning" />
				</Grid>
				<Grid item xs={10}>
					<small style={{ color: "orangered", marginLeft: 10 }}>
						{item?.name}
						{item?.flavor ? ` (${item?.flavor})` : ""}
					</small>{" "}
					is added to cart.
				</Grid>
			</Grid>
		</section>
	)
}

export default Notification
