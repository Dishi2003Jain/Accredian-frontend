import logo from './logo.svg';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
