import './index.css'

const FilteringFunction = props => {
  const {eachItem, CheckItemAddFucnction} = props
  const {label, employmentTypeId} = eachItem
  const onChangeCheack = () => {
    CheckItemAddFucnction(employmentTypeId)
  }
  return (
    <li className="job-type-item">
      <input
        type="checkbox"
        className="type-check"
        onChange={onChangeCheack}
        id={employmentTypeId}
      />
      <label className="type-check-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default FilteringFunction
