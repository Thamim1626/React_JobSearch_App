import './index.css'

const SalaryRange = props => {
  const {eachItem, onChangeSalaryRange} = props
  const {salaryRangeId, label} = eachItem
  const salaryIdFunction = () => {
    onChangeSalaryRange(salaryRangeId)
  }

  return (
    <div className="salary-range-item">
      <input
        name="range"
        type="radio"
        className="ratio-input"
        id={salaryRangeId}
        onChange={salaryIdFunction}
      />

      <label htmlFor={salaryRangeId} className="radio-label">
        {label}
      </label>
    </div>
  )
}

export default SalaryRange
