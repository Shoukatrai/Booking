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
        <h1 className="homeTitle">Browse by property type</h1>
      </div>

    </div>
  )
}

export default Home
