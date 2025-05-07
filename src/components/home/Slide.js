import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { products } from './productdata';
import "./slide.css";
import { NavLink } from "react-router-dom";
import { Navigation } from '@mui/icons-material';


const PrevArrow = ({ onClick }) => (
    <button className="custom-arrow prev-arrow" onClick={onClick}>
        <FaChevronLeft />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button className="custom-arrow next-arrow" onClick={onClick}>
        <FaChevronRight />
    </button>
);


const Slide = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 0,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <div className="products_section">
            <div className="products_deal">
                <h3>Our Products</h3>
                <button className="view_btn">View all</button>
            </div>
            <hr style={{ width: "100%", border: "1px solid #ccc" }} />

            <div className="slider-container">
                <Slider {...settings}>
                    {products.map((product) => (
                        <NavLink to={`/getproductsone/${product.id}`}>
                            <div key={product.id} className='products_items'>
                                <div className='product_img'>
                                    <img src={product.url} alt="productitems" />
                                </div>
                                <p className="products_name">
                                    {product.title.shortTitle}
                                </p>
                                <p className="products_offer">{product.discount}</p>
                                <p className="products_explore">{product.tagline}</p>
                            </div>
                        </NavLink>
                    ))}
                </Slider>
            </div>
        </div>

    )
}

export default Slide








// import React from 'react'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { RxDividerHorizontal } from "react-icons/rx";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { products } from './productdata';
// import "./slide.css";

// const PrevArrow = ({ onClick }) => (
//     <button className="custom-arrow prev-arrow" onClick={onClick}>
//         <FaChevronLeft />
//     </button>
// );

// const NextArrow = ({ onClick }) => (
//     <button className="custom-arrow next-arrow" onClick={onClick}>
//         <FaChevronRight />
//     </button>
// );


// const Slide = ({ title, products }) => {
//     var settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         initialSlide: 0,
//         prevArrow: <PrevArrow />,
//         nextArrow: <NextArrow />,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 3,
//                     infinite: true,
//                     dots: true
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 2,
//                     initialSlide: 2
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };
//     return (
//         <div className="products_section">
//             <div className="products_deal">
//                 <h3>Our Products</h3>
//                 <button className="view_btn">View all</button>
//             </div>
//             <hr style={{ width: "100%", border: "1px solid #ccc" }} />

//             <div className="slider-container">
//                 <Slider {...settings}>
//                     {products.map((product) => (
//                         <div key={product.id} className='products_items'>
//                             <div className='product_img'>
//                                 <img src={product.url} alt="productitems" />
//                             </div>
//                             <p className="products_name">
//                                 {product.title.shortTitle.split('\n').map((line, index) => (
//                                     <span key={index}>{line}<br /></span>
//                                 ))}
//                             </p>

//                             <p className="products_offer">{product.discount}</p>
//                             <p className="products_explore">{product.tagline}</p>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>

//     )
// }

// export default Slide

