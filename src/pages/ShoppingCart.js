import { Typography } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import OrdersSummary from '../components/OrdersSummary'
import ShoppingSummary from '../components/ShoppingSummary'
import useAuthContext from '../hooks/useAuthContext'

export default function ShoppingCart() {
  
  const [orders, setOrders] = useState([]);
  const {userId} = useAuthContext();
  const [sum, setSum] = useState(0.0);

  useEffect(() =>{

  },[])

  return (

    <>
    <Typography 
      variant='h4'
    > Koszyk
    </Typography>

    <OrdersSummary/>

    <ShoppingSummary/>    

    </>
    
  )
}
