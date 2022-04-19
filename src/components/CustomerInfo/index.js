import {useState, useEffect} from "react"
import {
	Modal,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
	Grid,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from "@mui/material"
import {CurrencyRuble, Edit, Save} from "@mui/icons-material"
import {GCASH} from "./../../data"
import Logo from "../Logo"

const deliveryRates = [
	{
		name: "Punta 1 & 2",
		price: 20
	},
	{
		name: "Heart Foundation Ph 1 & 2",
		price: 25
	},
	{
		name: "Paradahan 1 & 2",
		price: 25
	},
	{
		name: "Lumina Ph 1 - 3 & 5",
		price: 15
	},
	{
		name: "Lumina Ph 4",
		price: 20
	},
	{
		name: "Carissa Homes Ph 1 - 5",
		price: 15
	},
	{
		name: "Carissa Homes Ph 6 - 8",
		price: 20
	},
	{
		name: "Pabahay Ph 1 & 2",
		price: 10
	},
	{
		name: "Belleview, Cale 30 & 60",
		price: null
	}
]

const CustomerInfo = ({setCustomerInfo, customerInfo, setInfoSaved, infoSaved}) => {
	const [paymentMethod, setPaymentMethod] = useState("COD")
	const [location, setLocation] = useState("")
	const [editing, setEditing] = useState(false)
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		setPaymentMethod(customerInfo?.paymentMethod)
		console.log(customerInfo)
		const {name, address, delivery} = customerInfo
		console.log({name, address, delivery})
		if (!name && !address && !delivery.name) {
			setEditing(true)
		}

		// else {
		//   setEditing(false);
		// }
	}, [customerInfo])

	const handlePayment = (e, method) => {
		console.log({method})
		setPaymentMethod(method)
		setCustomerInfo({...customerInfo, payment_method: method})
	}

	const handleDataCheck = () => {
		console.log("handleDataCheck")
		setShowError(true)
		const {name, address, delivery, payment_method} = customerInfo
		console.log({payment_method})

		if (name && delivery.name && address && payment_method) {
			setEditing(!editing)
			setShowError(false)
		}
	}

	return (
		<div>
			<Modal open={!infoSaved} sx={{width: "100%", maxWidth: 500, margin: "0 auto"}}>
				<section className="product-modal customer-info">
					<Logo />
					<small style={{marginBottom: 10, display: "block"}}>
						Please fill this form for Delivery or Pick-up information.
					</small>

					<TextField
						variant={editing ? "filled" : "standard"}
						type="text"
						placeholder="Name"
						label="Name"
						fullWidth
						name="name"
						sx={{mb: 1}}
						value={customerInfo.name}
						required
						onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
						disabled={!editing}
						helperText={showError && "Name is required."}
						error={!customerInfo.name && showError}
					/>
					<TextField
						variant={editing ? "filled" : "standard"}
						type="text"
						placeholder="Address"
						label="Address"
						multiline
						fullWidth
						name="address"
						required
						sx={{mb: 1}}
						value={customerInfo.address}
						onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
						disabled={!editing}
						helperText={showError && "Address is required."}
						error={!customerInfo.address && showError}
					/>

					<FormControl fullWidth sx={{mt: editing ? 1 : 0}}>
						{editing ? <InputLabel id="location">Select delivery location</InputLabel> : <div />}
						<Select
							variant={editing ? "filled" : "standard"}
							fullWidth
							sx={{mb: 1}}
							label={editing ? "Select delivery location" : ""}
							id="location"
							onChange={e => {
								setCustomerInfo({
									...customerInfo,
									delivery: deliveryRates.filter(r => r.name === e.target.value)[0]
								})
								setLocation(e.target.value)
							}}
							value={location || customerInfo.delivery?.name}
							disabled={!editing}
							helperText={showError && "Delivery location is required."}
							error={!customerInfo.delivery?.name && showError}
							required
						>
							{deliveryRates.map((rate, idx) => {
								return (
									<MenuItem key={idx} value={rate.name}>
										{rate.name}
									</MenuItem>
								)
							})}
						</Select>
					</FormControl>

					<TextField
						variant={editing ? "filled" : "standard"}
						type="text"
						placeholder="Nearest Landmark"
						fullWidth
						name="landmark"
						sx={{mb: 1}}
						value={customerInfo.landmark}
						onChange={e => setCustomerInfo({...customerInfo, landmark: e.target.value})}
						disabled={!editing}
					/>
					<TextField
						variant={editing ? "filled" : "standard"}
						type="text"
						placeholder="House/Gate Color"
						fullWidth
						name="house-color"
						sx={{mb: 1}}
						value={customerInfo.house_color}
						onChange={e => setCustomerInfo({...customerInfo, house_color: e.target.value})}
						disabled={!editing}
					/>

					<article>
						<div style={{marginBottom: 10}}>
							<small>Mode of Payment</small>
						</div>
						<ToggleButtonGroup
							fullWidth
							value={customerInfo.payment_method || paymentMethod}
							exclusive
							onChange={handlePayment}
							// size='small'
							title="Mode of Payment"
							required
							// required
							disabled={!editing}
							helperText={showError && "Payment method is required."}
							error={!customerInfo.payment_method && showError}
						>
							<ToggleButton
								value="COD"
								// fullWidth
								color="warning"
								// disabled={!editing}
							>
								<Grid container alignItems="center">
									<Grid item xs={2} alignItems="center" display="flex">
										<CurrencyRuble fontSize="small" />
									</Grid>
									<Grid item xs={10} display="grid">
										<div>COD</div>
										<small style={{fontSize: 8}}>(Cash on Delivery)</small>
									</Grid>
								</Grid>
							</ToggleButton>
							<ToggleButton
								value="GCash"
								// fullWidth
								color="primary"
								// disabled={!editing}
							>
								<Grid container alignItems="center">
									<Grid item xs={3} alignItems="center" display="flex">
										<img src={GCASH} alt="" style={{width: "100%"}} />
									</Grid>
									<Grid item xs={9}>
										GCash
									</Grid>
								</Grid>
							</ToggleButton>
						</ToggleButtonGroup>
					</article>

					<Grid container sx={{mt: 2}} spacing={1} alignItems="center">
						<Grid item xs={5}>
							<Button
								fullWidth
								variant="text"
								color={editing ? "success" : "primary"}
								onClick={handleDataCheck}
								startIcon={editing ? <Save /> : <Edit />}
								size="small"
								// onClick={() => setEditing(!editing)}
							>
								{editing ? "Save Info" : "Edit Info"}
							</Button>
						</Grid>
						<Grid item xs={7}>
							<Button
								fullWidth
								variant="contained"
								color="success"
								disabled={editing}
								onClick={() => setInfoSaved(true)}
							>
								Okay, Let's go!
							</Button>
						</Grid>
					</Grid>
				</section>
			</Modal>
		</div>
	)
}

export default CustomerInfo
