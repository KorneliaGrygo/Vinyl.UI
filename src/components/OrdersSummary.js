import { Button, TextField } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react'
import { handleDeleteFromShopping, handleUpdateWishListAlbumAmount } from '../hooks/useAxios';

export default function OrdersSummary({orders, whishList, setRefresh, setSum, setWhishList}) {

  const sumPrizes = (prizes) => {
    let sum = 0;
    prizes.forEach(element => {
      sum += element.prize
    });
    setSum(sum.toFixed(2))
  }

  const countSumOfOrder = (ordersPrizes, whishList) => {
    const prizes = ordersPrizes.map(album => ({
      prize: album.price * whishList?.find(w => w.albumId == album.id)?.amount
    }))
    sumPrizes(prizes);
  }

    useEffect(() => {
        countSumOfOrder(orders, whishList);
    },[orders, whishList])

    const handleUpdateValue = (index, value, list) =>{
        if(value || value <= 0 || !isNaN(value)){
        const newWhislist = [...list]
        newWhislist.find(w => w.albumId == index).amount = Number(value < 1 ? 1 : value)
        setWhishList(newWhislist);
        handleUpdateWishListAlbumAmount(whishList.find(w => w.albumId == index).id, value)
        .catch(x => console.log(x.message))
        }
    }
    const handleDeleteFromShoppingList = (id) =>{
        handleDeleteFromShopping(id)
        setRefresh(prev => !prev)
    }
    
  return (
    <div>
        OrdersSummary
        {orders && orders.map(album=> (
            <>
                {album.id}. {album.price} |  
                ilosc :
                  <TextField
                    key={album.id}
                    type='number'
                    value = {Number( whishList?.find(w => w.albumId == album.id)?.amount)}
                    variant='outlined'
                    size='small'
                    style={{
                        width:60,
                        textAlign:'center'
                    }}
                    onChange={(e) => handleUpdateValue(album.id, e.target.value, whishList)}
                    />
                <Button
                    variant='oulined'
                    color="error"
                    onClick={(e) => handleDeleteFromShoppingList(whishList?.find(w => w.albumId == album.id)?.id)}
                >
                    Usuń
                </Button>
            </>
        ))}

    </div>
  )
}
