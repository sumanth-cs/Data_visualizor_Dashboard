
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login';
import News from './pages/news/News';
import Analysis from './pages/analysis/Analysis';
import Home from './pages/home/Home';
import AuthContextProvider from './context/AuthContext';



function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </AuthContextProvider >
      </BrowserRouter>
    </div>
  );
}

export default App;
