import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <input placeholder="Filter" onChange={() => dispatch(setFilter(event.target.value))} />
    </div>
  )
}

export default Filter