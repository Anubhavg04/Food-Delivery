import React from 'react'


type Props = {
sortBy: 'rating' | 'price' | 'time' | '';
setSortBy: (s: 'rating'|'price'|'time'|'') => void;
}


const Sort: React.FC<Props> = ({ sortBy, setSortBy }) => {
return (
	<div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors">
		<label htmlFor="sort-select" className="font-semibold mb-2 block text-gray-900 dark:text-gray-100">Sort</label>
		<select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
			<option value="">Default</option>
			<option value="rating">Top Rated</option>
			<option value="price">Price: Low to High</option>
			<option value="time">Delivery Time</option>
		</select>
	</div>
)
}


export default Sort