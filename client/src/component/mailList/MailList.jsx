import  './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
      <h1 className="mailTitle">Save Time Save Money</h1>
      <span className="mailDesc">Signup and we shall send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="email" placeholder='Your Email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
