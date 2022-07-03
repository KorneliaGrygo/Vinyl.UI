import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import Masonry from 'react-masonry-css'
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const [notes, setNotes] = useState([])
  const history = useHistory();
  const {user} = useAuthContext();
  return (
    <div style={{
      width: `Calc(100% - 240px)`
    }}>
      <div style={{
        textAlign: "center",

      }}>
        <Typography variant="h1" component="h2" style={{
          marginTop: "50px",
          marginBottom: "50px"
        }}>
          Witaj!
        </Typography>
        <Typography variant='h5' style={{
          textAlign: "center",
          wordWrap: "break-word",
        }}>
          Vinyl.pl jest to portal społecznościowy zrzeszający fanów płyt winylowych. <br />
          <br />
          Możesz wyszukiwać interesujące Cię albumy oraz tworzyć własne kolekcje. <br />
          <br />
          Nie czekaj, dołącz już dziś!
        </Typography>
      </div>
        {!user && 
      <div style={{ textAlign: "center", marginTop: "150px" }}>
        <Button
          variant="outlined"
          size="medium"
          onClick={()=> history.push("/login")}
          >
          Zaloguj się
        </Button>
        <Button
          variant="outlined"
          size="medium" style={{
            marginLeft: "100px"
          }}
          onClick={()=> history.push("/signup")}

          >
          Zarejestruj się
        </Button>
      </div>
      }

    </div>
  )
}
