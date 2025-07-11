import { useNavigate } from "react-router-dom"
import LOGO from "../../../../assets/images/logo/logo_nobg.png"
import { useState } from "react"

export const Footer = () => {

  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = async (e) => {
    try {
      e.preventDefault()
      alert(email, "---------------email---------------");
      if (!email) {
        alert("email is required.")
      }

    }
    catch (error) {
      console.log(error, "---------------error---------------");
    }
  }


  return (

    // <footer className="bg-[#796853] dark:bg-[#45392D] text-white px-6 py-10 md:px-16">
    <footer className="bg-[#171717]  text-white px-6 py-10 md:px-16">
      {/* Grid layout for responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <aside className="flex flex-col items-center md:items-start">
          <img src={LOGO} alt="logo" className="w-[150px]" />
          <p className="text-mainbutton mt-3 text-center md:text-start">
            Mukesh Gems & Jewellers
            <br />
            <span className="text-white">
              Timeless Elegance, Trusted Craftsmanship.
            </span>
          </p>
          <p className="mt-2 text-sm">© MukeshGems 2025</p>
        </aside>

        {/* Special Category Links */}
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="text-mainbutton font-semibold mb-2">Special</h6>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/catagory/1")}
          >
            Featured Products
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/catagory/1")}
          >
            Latest Products
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/bestselling")}
          >
            Best Selling Products
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/catagory/1")}
          >
            Top Rated Products
          </a>

        </nav>

        {/* Company Policies */}
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="text-mainbutton font-semibold mb-2">Company</h6>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/about_us")}
          >
            About Us
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/refund")}
          >
            Refund Policy
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/cancellation-policy")}
          >
            Cancellation Policy
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/return-policy")}
          >
            Return & Exchange Policy
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/term-and-condition")}
          >
            Terms of Use
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/privacy")}
          >
            Privacy Policy
          </a>
          <a
            className="block hover:text-mainbutton transition duration-200 cursor-pointer"
            onClick={() => navigate("/faq")}
          >
            Frequently Asked
          </a>
        </nav>

        {/* Newsletter Subscription */}
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="text-mainbutton font-semibold mb-2">Newsletter</h6>
          <form className="items-center flex flex-row" onSubmit={handleSubmitEmail}>

            <input
              type="email"
              id="Email"

              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="off"
              className="min-h-[50px] max-w-[150px] px-4 bg-white text-mainheading text-[15px] border border-mainbutton rounded-l-md  focus:border-mainbutton focus:outline-none"
            />
            <input
              type="submit"
              value="Subscribe"
              className="min-h-[50px] px-4 bg-mainbutton text-white text-[15px] cursor-pointer transition-colors duration-300 ease-in-out rounded-r-md hover:bg-mainbutton"
            />

          </form>

        </nav>

      </div>
    </footer>



  )
}
