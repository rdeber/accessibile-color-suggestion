import React, { useState } from 'react';
import { Typography, Button, InputBase, Paper, CssBaseline, Slider } from '@mui/material';
import { suggestAccessibleColor } from './utils/suggestAccessibleColor';

function App() {
  const [color, setColor] = useState<string>('#bada55');
  const [colorSuggestion, setColorSuggestion] = useState<string[]>([]);
  const [inputColorString, setInputColorString] = useState<string>('');
  const [contrastThreshold, setContrastThreshold] = useState<number>(4.5);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputColorString(event.target.value);
  };

  const handleSliderChange = (_: Event, newValue: number | number[], __: number) => {
    setContrastThreshold(newValue as number);
};


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setColor(inputColorString);
    setColorSuggestion(suggestAccessibleColor(inputColorString, contrastThreshold));
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
      <Typography sx={{ color: colorSuggestion[0] }} variant='h1' component={'h1'}>
        Accessible Color Suggestions
      </Typography>
      <Typography sx={{ color: colorSuggestion[0] }} variant='h2' component={'h2'} gutterBottom>
        Accessible Color Suggestions
      </Typography>
      <Typography sx={{ color: colorSuggestion[0] }} component={'p'} gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
        Contrast Threshold
      </Typography>
      <Slider
          value={contrastThreshold}
          min={1}
          max={7}
          step={0.1}
          onChange={handleSliderChange}
      />
      <Typography variant="h3" component="div" gutterBottom>
        Suggested Colors
      </Typography>
      {colorSuggestion.map((suggestion, index) => (
        <Paper
          key={index}
          component="div"
          sx={{ background: suggestion, p: '2px 4px', width: 200, height: 200}}
        >
        </Paper>
      ))}
    </main>
    </>
  );
}

export default App;
