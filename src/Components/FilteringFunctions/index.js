import './index.css'

const FilteringFunction = props => {
  const {eachItem, CheckItemAddFucnction} = props
  const {label, employmentTypeId} = eachItem
  const onChangeCheack = () => {
    CheckItemAddFucnction(employmentTypeId)
  }
  return (
    <div className="job-type-item">
      <input
        type="checkbox"
        className="type-check"
        onChange={onChangeCheack}
        id={employmentTypeId}
      />
      <label className="type-check-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </div>
  )
}

export default FilteringFunction
