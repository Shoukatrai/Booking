import './list.css'
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/header'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'


const List = () => {
  const locations = useLocation()
  const [destination, setDestination] = useState(locations.state.destination)
  const [date, setDate] = useState(locations.state.date)
  const [opendate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(locations.state.options)

  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle"> Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input type="text" />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!opendate)} >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {opendate && <DateRange
                onChange={(item) => { setDate([item.selection]) }} minDate={new Date()}
                ranges={date}
              />}
            </div>

            <div className="lsItem">
              <label >Options</label>
              <div className="lsOptionItem">
                <span className="lsOptionText">min price <small>per night</small></span>
                <input type="number" className='lsOptionInput' />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">Max price <small>per night</small></span>
                <input type="number" className='lsOptionInput' />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">Adult</span>
                <input type="number" className='lsOptionInput' placeholder= {options.adult} />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input type="number" className='lsOptionInput' placeholder= {options.children} />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input type="number" className='lsOptionInput' placeholder= {options.room} />
              </div>
            </div>


          </div>
          <div className="listResult"></div>
        </div>
      </div>
    </>
  )
}

export default List
