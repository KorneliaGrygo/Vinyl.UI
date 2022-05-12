import React, { useEffect, useState } from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import { Button } from "@material-ui/core";

export default function Home() {
  const [notes, setNotes] = useState([])

  return (
    <div style={{
      width:`Calc(100% - 240px)`
    }}>
      <div style={{
        textAlign: "center",

      }}>
        <Typography variant="h1" component="h2" style={{
          marginTop:"50px",
          marginBottom:"50px"
        }}>
          Witaj!
        </Typography>
        <Typography variant='h5' style={{
          textAlign: "center",
          wordWrap: "break-word",
          
        }}>
          Vinyl.pl jest to portal społecznościowy zrzeszający fanów płyt winylowych. <br/>
          <br/>
          Możesz wyszukiwać interesujące Cię albumy oraz tworzyć własne kolekcje. <br/>
          <br/>
          Nie czekaj, dołącz już dziś! 
        </Typography>
      </div>
      <div style={{ textAlign: "center", marginTop:"150px" }}>
        <Button variant="outlined" size="medium">
          Zaloguj się
        </Button>
        <Button variant="outlined" size="medium" style={{
          marginLeft:"100px"
        }}>
          Zarejestruj się
        </Button>
      </div>
    </div>
  )
}
