import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './App.css'

function App() {
  const [color, setColor] = useState<string>('#bada55')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  }

  return (
    <>
      <Typography variant="h1" component="div" gutterBottom>
        Accessible Color Suggestions
      </Typography>
      <TextField onChange={handleChange} id="outlined-basic" label="Outlined" variant="outlined" />
      <Typography variant="h1" component="div" gutterBottom>
        {color}
      </Typography>
    </>
  )
}

export default App
