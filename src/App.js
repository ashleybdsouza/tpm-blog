import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Technologies from './pages/Technologies';


function App() {
    return (
        <BrowserRouter basename="/tpm-blog">
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