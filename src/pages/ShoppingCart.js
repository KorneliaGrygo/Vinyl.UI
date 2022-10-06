import { Typography } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import OrderForm from '../components/OrderForm'
import OrdersSummary from '../components/OrdersSummary'
import ShoppingSummary from '../components/ShoppingSummary'
import useAuthContext from '../hooks/useAuthContext'
import { handleGetOrders, handleGetShoppingAlbums } from '../hooks/useAxios'

export default function ShoppingCart() {

  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();
  const [sum, setSum] = useState(0.0);
  const [refresh, setRefresh] = useState(false);
  const [whishList, setWhishList] = useState([]);
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    if (user.id) {
      debugger;
      handleGetOrders(user.id).then(data => {
        if (data) {
          setWhishList(data)
        }
      }).catch(x => console.log(x.message))

      handleGetShoppingAlbums(user.id).then(data => {
        if (data) {
          setOrders(data)
        }
      }).catch(x => console.log(x.message))
    }
  }, [user.id, refresh])

  return (

    <>
      <Typography
        variant='h4'
        style={{
          marginLeft:'630px',
          marginTop:'10px'
        }}
      > Koszyk
      </Typography>
     {orders && whishList &&  whishList.some(w => w.albumId == orders[0]?.id)  && 
      <>
      <OrdersSummary
        orders={orders}
        whishList={whishList}
        setRefresh={setRefresh}
        setSum={setSum} 
        setWhishList={setWhishList}
        />
      <ShoppingSummary sum={sum} setShowform={setShowform} />

      
      {showForm && <OrderForm/> }
      </>
      

    }
    { !whishList.some(w => w.albumId == orders[0]?.id)  && 
      <Typography variant='h3'
        style={{
          marginLeft:'450px',
          marginTop:'50px'
        }}
      >
        Twój koszyk jest pusty
      </Typography>
    }


    </>




  )
}
