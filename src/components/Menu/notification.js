import { AddShoppingCart } from "@mui/icons-material"
import { Divider, Grid } from "@mui/material"
import React from "react"

const Notification = ({ item, showNotif }) => {
	return (
		<section className={`notification ${showNotif ? "show" : ""}`}>
			<Grid container alignItems="center">
				<Grid item xs={2} sx={{ borderRight: "1px solid orangered" }}>
					<AddShoppingCart color="warning" />
				</Grid>
				<Grid item xs={10}>
					<span style={{ color: "orangered", marginLeft: 10 }}>
						{item?.name}
						{item?.flavor ? ` (${item?.flavor})` : ""}
					</span>{" "}
					is added to cart.
				</Grid>
			</Grid>
		</section>
	)
}

export default Notification
