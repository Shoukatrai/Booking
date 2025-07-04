import Featured from '../../component/featured/Featured'
import Header from '../../component/header/header'
import Navbar from '../../component/navbar/Navbar'
import './home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
      </div>

    </div>
  )
}

export default Home
