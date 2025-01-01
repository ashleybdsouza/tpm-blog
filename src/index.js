import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));

// Check if this is a redirect from the 404 page
const searchParams = new URLSearchParams(window.location.search);
const route = searchParams.get('route');

if (route) {
  // Remove the query parameter and redirect
  window.history.replaceState(null, '', '/tpm-blog/');
  root.render(<App />);
  // Navigate to the intended route using window.location.hash
  window.location.hash = route;
} else {
  root.render(<App />);
}
