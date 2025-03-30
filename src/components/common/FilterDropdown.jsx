const FilterDropdown = ({ options, selected, onChange, label }) => {
    return (
      <div className="w-full md:w-48">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
        >
          {options.map((option) => (
            <option key={option} value={option === 'All' ? 'all' : option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default FilterDropdown