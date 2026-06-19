import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app/globals.css';
import 'leaflet/dist/leaflet.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No se encontró el elemento root en el DOM.');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
