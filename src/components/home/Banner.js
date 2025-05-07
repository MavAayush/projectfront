import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./banner.css";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="banner-slider" style={{
      backgroundImage: 'url("https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/19/full/1681882435-7523.jpg?im=FeatureCrop,size=(1200,900)")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      

      <Slider {...settings}>
        <div className="banner-slide1">
          <div className="banner-content">
            <h2>Our Rich Heritage</h2>
            <p>
              Each product is a reflection of our commitment to authenticity and quality.<br />
              Keshri Tobacco — where heritage meets quality, and tradition lives on.
            </p>
          </div>
        </div>

        <div className="banner-slide2"  style={{
    backgroundImage: 'url("https://images.unsplash.com/photo-1725645843195-979b86f9cfe0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvYmFjY28lMjBmYXJtfGVufDB8fDB8fHww")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  }} >
          <div className="banner-content"  >
            <h2>Your Destination for Premium Tobacco</h2>
            <p> From carefully sourced leaves to masterful processing techniques.<br />
              Keshri Tobacco stands as a destination for those who seek elegance in every experience.
            </p>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default Banner