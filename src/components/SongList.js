import React from 'react'

export default function SongList({songs}) {
  return (
    <div> SongList
        <br />  

    {songs && songs.map(song => (
        <p>{song}</p>
    ))}

    </div>
  )
}
