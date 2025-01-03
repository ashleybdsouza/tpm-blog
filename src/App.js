import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Technologies from './pages/Technologies';
import GoogleAnalytics from './hooks/useGoogleAnalytics'; // Import the hook


function App() {
      //useGoogleAnalytics(); // Call the hook to initialize and track page views

    return (
        <BrowserRouter basename="/tpm-blog">
         <GoogleAnalytics /> {/* Render the component inside BrowserRouter */}
          <Header />
            <Routes>
                <Route path="/" element={
                  <>
                    <HomePage />
                    <Technologies />
                    <ContactPage />
                  </>
                } />
                <Route path="/post/:slug" element={<PostPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/technologies" element={<Technologies />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;