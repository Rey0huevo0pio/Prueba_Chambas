import React from "react"

import AOS from "aos";
import 'aos/dist/aos.css'


import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Al_Readaptivos from "./P_Quimicos/Al_Readaptivos";

const Home_Page = () => {

  React.useEffect(()=>{
    AOS.init({
      offset:100,
      duration:800,
      easing: "ease-in-sine",
      delay:100,
    });
  })


  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Al_Readaptivos className="flex-1" />

    </div>
  );
  
}
export default Home_Page