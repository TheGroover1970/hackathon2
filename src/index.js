import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';

import App from './App';
import Header from './Components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
     <ColorModeProvider options={{ initialColorMode: 'light' }}>
        <CSSReset />
        <Header />
        {/* Your other content goes here */}
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
