import { Typography } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import OrderForm from '../components/OrderForm'
import OrdersSummary from '../components/OrdersSummary'
import ShoppingSummary from '../components/ShoppingSummary'
import useAuthContext from '../hooks/useAuthContext'
import { handleAddNewOrder, handleDeleteWhistListItemByUserId, handleGetOrders, handleGetShoppingAlbums } from '../hooks/useAxios'

export default function ShoppingCart() {

  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();
  const [sum, setSum] = useState(0.0);
  const [refresh, setRefresh] = useState(false);
  const [whishList, setWhishList] = useState([]);
  const [showForm, setShowform] = useState(false);
  const [orderError, setOrderError] = useState('');
  const history = useHistory();

  const generateRandomIdInRange = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min) ;
  }

  const handleRealizeOrder = async (orderDetails) => {
    

      const albums = orders;
      const amounts = whishList;

      const dataToSave = {

        albums: albums.map(album => ({
            albumId : album.id,
            name: album.name,
            band: album.band,
            avatar: album.avatarUrl,
            price : album.price,
            amount: amounts.find(x => x.albumId == album.id)?.amount 
        })),
        sum: sum,
        userId: user.id,
        orderState: "W trakcie realizacji",
        orderDetails:orderDetails,
        generatedOrderId: generateRandomIdInRange(10000, 250000)
      }

      const responseObject = await handleAddNewOrder(dataToSave);

      if(responseObject.statusCode === 201){
        debugger;
          await handleDeleteWhistListItemByUserId(amounts);

          history.push(`/orders/${responseObject.data?.id}`) // przygotować nowy komponent
      }else{
        setOrderError("Coś poszło nie tak podczas składania zamówienia, spróbuj ponownie później.")
      }

  }
  
  useEffect(() => {
    if (user.id) {
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
          marginLeft: '130px',
          marginTop: '30px'
        }}
      > Koszyk
      </Typography>
      {orders && whishList && whishList.some(w => w.albumId == orders[0]?.id) &&
        <>
          <OrdersSummary
            orders={orders}
            whishList={whishList}
            setRefresh={setRefresh}
            setSum={setSum}
            setWhishList={setWhishList}
          />
          <ShoppingSummary sum={sum} setShowform={setShowform} />


          {showForm &&
            <OrderForm
            handleRealizeOrder={handleRealizeOrder}
            //to do funckja do obslugi dodania do bazy i czyszczenie koszyka
            />}
        </>


      }
      {!whishList.some(w => w.albumId == orders[0]?.id) &&
        <Typography variant='h3'
          style={{
            marginLeft: '450px',
            marginTop: '50px'
          }}
        >
          Twój koszyk jest pusty
        </Typography>
      }
    </>
  )
}
