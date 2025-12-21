import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // To importuje Twój styl Apple
import App from './App'; // To importuje główną aplikację
import './styles.css';

// Znajdź element w HTML, do którego podepniemy aplikację
const rootElement = document.getElementById('root');

// Zabezpieczenie na wypadek błędu w HTML
if (!rootElement) {
  throw new Error('Błąd krytyczny: Nie znaleziono elementu <div id="root"> w pliku index.html');
}

// Utworzenie "korzenia" Reacta
const root = ReactDOM.createRoot(rootElement);

// Renderowanie aplikacji
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
