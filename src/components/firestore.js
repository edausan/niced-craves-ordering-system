import { onSnapshot, collection, addDoc } from "firebase/firestore"

import { useEffect, useState } from "react"

const GetData = ({ colRef, db }) => {
	const ref = collection(db, colRef)
	const [data, setData] = useState([])

	useEffect(() => {
		onSnapshot(ref, snapshot => {
			const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setData(docs)
		})
	}, [])

	return { best_sellers: data.filter(item => item.is_best_seller), products: data.filter(item => !item.is_best_seller) }
}

const AddData = ({ colRef, db, params }) => {
	const ref = collection(db, colRef)
	addDoc(ref, { ...params })
}

export { GetData, AddData }
