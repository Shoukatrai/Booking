import { Link } from 'react-router-dom'
import './searchItem.css'
import fallbackImage from '../../assets/images.png';
const SearchItem = ({ item }) => {
    return (
        <div className='searchItem'>
            <img
                src={item.photos[0] || fallbackImage}
                alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item?.name}</h1>
                <span className="siDistance">{item?.distance} from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    {item.title}
                </span>
                <span className="siFeatures">
                    {item.desc}
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                {item?.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item?.rating}</button>
                </div>}
                <div className="siDetailsText">
                    <span className="siPrice">{item?.cheapestPrice}</span>
                    <span className="siTexOp">Includes taxes and fees</span>
                    <Link to={`/hotel/${item._id}`}>
                        <button className='siCheckBtn'>See Availbility</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem
