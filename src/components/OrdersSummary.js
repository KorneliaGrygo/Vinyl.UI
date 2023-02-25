import { Avatar, Button, Divider, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { handleDeleteFromShopping, handleUpdateWishListAlbumAmount } from '../hooks/RequestHandlers';
import { Height } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => {
  return {
    paper: {
      width: "Calc(100% - 240px)",
      overflowY: true,
    },
    avatar: {
      width: '50px',
      height: '50px',
      border: "1px solid black",
      marginTop:'10px',
      marginLeft:'10px',
      marginBottom:'10px'
    },
    singleItem:{
      display:'flex',
      textAlign:'center',
      border:'1px solid lightgray',
    },
    bandName:{
      marginTop:"25px",
      marginLeft:'30px',
      width:'200px'
    },
    input:{
      marginTop:'15px',
      marginLeft:'60px'
    },
    price:{
      marginTop:'25px',
      marginLeft:'25px',
      width:'200px'
    },
    delete:{
      marginLeft:'450px'
    }
  }
})

export default function OrdersSummary({ orders, whishList, setRefresh, setSum, setWhishList }) {
  const classes = useStyles()
  const history = useHistory()
  
  const sumPrices = (prices) => {
    let sum = 0;
    prices.forEach(element => {
      sum += element.worth
    });
    setSum(sum.toFixed(2))
  }
  const countSumOfOrder = (ordersPrizes, whishList) => {
    const prices = ordersPrizes.map(album => ({
      worth: album.price * whishList?.find(w => w.albumId == album.id)?.amount
    }))
    sumPrices(prices);
  }

  useEffect(() => {
    countSumOfOrder(orders, whishList);
  }, [whishList])

  const handleUpdateValue = (index, value, list) => {
    if (value && Number(value) > 0) {
      const newWhislist = [...list] 
      newWhislist.find(w => w.albumId == index).amount = Number(value) 
      debugger;
      setWhishList(newWhislist);
      handleUpdateWishListAlbumAmount(whishList.find(w => w.albumId == index).id, value)
        .catch(x => console.log(x.message))
    }
  }
  
  const handleDeleteFromShoppingList = (id) => {
    handleDeleteFromShopping(id)
    setRefresh(prev => !prev)
  }
  return (
    <div style={{
      width: "Calc(100% - 480px)",
      marginTop:'25px',
      marginLeft:'125px'
    }}>
      <Paper>
        {orders && orders.map(album => (
          
            <div className={classes.singleItem}>
                <Avatar
                  className={classes.avatar}
                  variant='square'
                  src={album.avatarUrl}
                  onClick={() => history.push(`/albums/details/${album.id}`)}
                />
                <Typography className={classes.bandName}>
                  {album.name}
                </Typography>
                <TextField
                  className={classes.input}
                  key={album.id}
                  type='number'
                  value={Number(whishList?.find(w => w.albumId == album.id)?.amount)}
                  variant='outlined'
                  size='small'
                  style={{
                    width: Number(whishList?.find(w => w.albumId == album.id)?.amount) > 9 ?  80 : 70,
                  }}
                  InputProps={{
                    max: 10, min: 1 
                  }}
                  onChange={(e) => handleUpdateValue(album.id, e.target.value, whishList)}
                />
                <Typography className={classes.price}>
                  {album.price} zł.
                </Typography>
                <Button
                  className={classes.delete}
                  size='small'
                  variant='oulined'
                  color="error"
                  onClick={(e) => handleDeleteFromShoppingList(whishList?.find(w => w.albumId == album.id)?.id)}
                  startIcon={<DeleteIcon />}
                >
                  Usuń
                </Button>
            </div>
        ))}
      </Paper>

    </div>
  )
}
