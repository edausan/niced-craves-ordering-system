import React from "react"
import SummerLogo from "../images/summer_logo.png"

const Logo = () => {
	return (
		<div
			style={{
				position: "relative",
				textAlign: "center",
				marginBottom: 10
			}}
		>
			<img src={SummerLogo} alt="" style={{width: "50%"}} />
		</div>
	)
}

export default Logo
