import ClubHouse from "./images/clubhouse.jpg"
import Corndog from "./images/corndog.JPG"
import OnionRings from "./images/onion_rings.JPG"
import Milktea from "./images/Milktea.png"
import mojos from "./images/mojos.JPG"
import cheesestick from "./images/cheesestick.JPG"
import CheesyBacon from "./images/CheesyBacon.JPG"

console.log({ ClubHouse })

const uid = () => {
	return Math.random()
}

export const menu = [
	{
		id: "corndog",
		img: Corndog,
		name: "Corndog",
		prices: [49],
		sizes: null,
		flavors: null,
		add_ons: null
	},
	{
		id: "mojos",
		img: mojos,
		name: "Mojos",
		prices: [59],
		sizes: null,
		flavors: null,
		add_ons: null
	},
	{
		id: "bacon",
		img: CheesyBacon,
		name: "Cheesy Bacon w/ Egg & Rice",
		prices: [89],
		sizes: null,
		flavors: null,
		add_ons: null
	},
	{
		id: "cheesestick",
		img: cheesestick,
		name: "Cheesestick",
		prices: [20],
		sizes: null,
		flavors: null,
		add_ons: null
	},
	{
		id: "onion",
		img: OnionRings,
		name: "Onion Rings",
		prices: [59],
		sizes: null,
		flavors: null,
		add_ons: null
	},
	{
		id: "club",
		img: ClubHouse,
		name: "Clubhouse w/ Fries",
		prices: [99],
		sizes: null,
		flavors: null,
		add_ons: null
	},
	{
		id: "milktea",
		img: Milktea,
		name: "Creamy Milktea",
		prices: [39, 49],
		sizes: ["Medium", "Large"],
		flavors: [
			{ id: uid(), name: "Dark Chocolate", is_best_seller: true },
			{ id: uid(), name: "Chocolate", is_best_seller: false },
			{ id: uid(), name: "Wintermelon", is_best_seller: true },
			{ id: uid(), name: "Okinawa", is_best_seller: false },
			{ id: uid(), name: "Red Velvet", is_best_seller: false },
			{ id: uid(), name: "Hazelnut", is_best_seller: false },
			{ id: uid(), name: "Caramel Sugar", is_best_seller: false },
			{ id: uid(), name: "Salted Caramel", is_best_seller: false },
			{ id: uid(), name: "Mango Cheesecake", is_best_seller: false },
			{ id: uid(), name: "Matcha", is_best_seller: false }
		],
		add_ons: [
			{ id: uid(), name: "Creamcheese", price: 10 },
			{ id: uid(), name: "Pearls", price: 10 }
		]
	}
]
