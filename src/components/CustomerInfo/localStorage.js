import React, { useEffect, useState } from "react"

const LocalStorage = ({ customerInfo, infoSaved }) => {
	const [customerFromStorage, setCustomerFromStorage] = useState({
		name: null,
		address: null,
		phone: null,
		landmark: null,
		house_color: null,
		payment_method: "COD",
		delivery: null
	})

	useEffect(() => {
		handleGetCustomer()
	}, [])

	useEffect(() => {
		console.log({ customerInfo, infoSaved })
		customerInfo.name && infoSaved && handleSave()
	}, [customerInfo, infoSaved])

	const handleSave = () => {
		localStorage.setItem("customer_info", JSON.stringify(customerInfo))
	}

	const handleGetCustomer = () => {
		const customer_info = JSON.parse(localStorage.getItem("customer_info"))
		setCustomerFromStorage(customer_info)
	}

	return { customerFromStorage }
}

export default LocalStorage
