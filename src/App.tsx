import React, { useState } from 'react';
import { Typography, Button, InputBase, Paper, styled, CssBaseline } from '@mui/material';
import { suggestAccessibleColor } from './utils/suggestAccessibleColor';

function App() {
  const [color, setColor] = useState<string>('#bada55');
  const [colorSuggestion, setColorSuggestion] = useState<string>('#999999');
  const [inputColorString, setInputColorString] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputColorString(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (/^#[0-9A-F]{6}$/i.test(inputColorString)) {
      setColor(inputColorString);
      setColorSuggestion(suggestAccessibleColor(inputColorString));
    } else {
      alert('Invalid color format. Please provide a color in the format #RRGGBB.');
    }
  };

  const mainStyle = {
    backgroundColor: color,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  } as React.CSSProperties;

  return (
    <>
      <CssBaseline />
      <main style={mainStyle}>
      <Typography variant="h1" gutterBottom>
        Accessible Color Suggestions
      </Typography>
      <Paper
        component="form"
        onSubmit={handleSubmit} // Add the onSubmit handler here
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Set Background Color"
          inputProps={{ 'aria-label': 'Set Background Color' }}
          value={inputColorString}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" aria-label="Apply">
          Apply
        </Button>
      </Paper>
      <Typography variant="h3" component="div" gutterBottom>
        {colorSuggestion}
      </Typography>
    </main>
    </>
  );
}

export default App;
