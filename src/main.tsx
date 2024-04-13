import React from 'react';
import ReactDOM from 'react-dom/client';
import { enableMocking } from './mocks/enableMocking';
import App from '@/App';
import './index.css';

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
