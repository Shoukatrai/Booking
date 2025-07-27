import axios from 'axios'
import './featuredProperties.css'
import { BASE_URL } from '../../utils'
import { apiEndPoints } from '../../constant/apiEndPoints'
import { useEffect, useState } from 'react'
import fallbackImage from '../../assets/images.png';


const FeaturedProperties = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const fetchData = async () => {
        setLoading(true); // Optional: show loading
        try {
            const api = `${BASE_URL}${apiEndPoints.getHotelFeatured}`;
            const response = await axios.get(api);
            console.log("response", response);
            setData(response.data); // <-- this line is missing in your code
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="fp">
            {loading ? (
                "Loading"
            ) : (
                <>
                    {data.map((item) => (
                        <div className="fpItem" key={item._id}>
                            <img
                                src={item.photos?.length ? item.photos[0] : fallbackImage}
                                alt="hotel image"
                                className="fpImg"
                            />

                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                            {item.rating && <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default FeaturedProperties
