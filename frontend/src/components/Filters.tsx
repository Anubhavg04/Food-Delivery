import React from 'react'


type Props = {
onlyVeg: boolean;
setOnlyVeg: (v: boolean) => void;
minRating: number;
setMinRating: (r: number) => void;
}


const Filters: React.FC<Props> = ({ onlyVeg, setOnlyVeg, minRating, setMinRating }) => {
return (
	<div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 transition-colors">
		<h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Filters</h3>
		<div className="flex items-center mb-2">
			<input id="veg" type="checkbox" checked={onlyVeg} onChange={e => setOnlyVeg(e.target.checked)} className="h-4 w-4" />
			<label htmlFor="veg" className="ml-2 text-sm text-gray-700 dark:text-gray-200">Veg only</label>
		</div>


		<div className="mb-2">
			<label className="text-sm text-gray-700 dark:text-gray-200">Minimum rating</label>
			<select value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" title="Minimum rating filter">
				<option value={0}>Any</option>
				<option value={3}>3+</option>
				<option value={4}>4+</option>
				<option value={4.5}>4.5+</option>
			</select>
		</div>
	</div>
)
}


export default Filters