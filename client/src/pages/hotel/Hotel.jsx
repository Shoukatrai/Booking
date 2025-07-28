import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../component/header/header'
import Navbar from '../../component/navbar/Navbar'
import './hotel.css'
import { faCircleArrowLeft, faCircleArrowRight, faCircleLeft, faCircleRight, faCircleXmark, faL, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../component/mailList/MailList'
import Footer from '../../component/footer/Footer'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { apiEndPoints } from '../../constant/apiEndPoints'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/searchContext'
import { AuthContext } from '../../context/authContext'

const Hotel = () => {
  //  const location = useLocation();
  // const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  // const [open, setOpen] = useState(false);
  // const [openModal, setOpenModal] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  // const handleOpen = (i) => {
  //   setSlideNumber(i);
  //   setOpen(true);
  // };

  // const handleMove = (direction) => {
  //   let newSlideNumber;

  //   if (direction === "l") {
  //     newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
  //   } else {
  //     newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
  //   }

  //   setSlideNumber(newSlideNumber);
  // };

  // const handleClick = () => {
  //   if (user) {
  //     setOpenModal(true);
  //   } else {
  //     navigate("/login");
  //   }
  // };
  const [sliderNumber, setSliderNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  console.log("hotel id", id)
  const [data, setData] = useState({})

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const fetchHotel = async () => {
    try {
      const api = `${BASE_URL}${apiEndPoints.getSingleHotel}/${id}`
      console.log("api", api)
      const response = await axios.get(api)
      console.log("response fetch Hotel", response.data)
      setData(response.data)
    } catch (error) {
      console.log("error fetch Hotel", error)
    }
  }

  useEffect(() => {
    fetchHotel()
  }, [])

  const handleOpen = (i) => {
    setSliderNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = sliderNumber === 0 ? 5 : sliderNumber - 1
    } else {
      newSlideNumber = sliderNumber === 5 ? 0 : sliderNumber + 1
    }

    setSliderNumber(newSlideNumber)
  }



  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days || 0}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room || 0}</b> ({days || 0}{" "}  
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel
