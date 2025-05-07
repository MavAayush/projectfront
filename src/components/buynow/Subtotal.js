import React,{useEffect, useState} from 'react'

const Subtotal = ({iteam}) => {


  const [price, setPrice] = useState(0);
  useEffect(() => {
    totalAmount();
  },[iteam])

  const totalAmount = () => {
    let price = 0;
    iteam.forEach(item => {
      price += item.price.cost * (item.quantity || 1);
    });
    setPrice(price);
  };

  return (
    <div className='sub_item'>
        <h3>Sub Total ({iteam.length} items) : <strong style={{fontWeight:700,color:"#111"}}> ₹{price}.00</strong></h3>
      
    </div>
  )
}

export default Subtotal
