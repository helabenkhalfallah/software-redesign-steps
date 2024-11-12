import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app-root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app-root') as HTMLElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
