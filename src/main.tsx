import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RiskProvider } from './context/RiskContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RiskProvider>
      <App />
    </RiskProvider>
  </StrictMode>,
);
