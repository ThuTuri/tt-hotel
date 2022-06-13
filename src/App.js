import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/home" exact element={<HomeScreen />}/>
        <Route path="/book/:roomid/:fromDate/:toDate" element={<BookingScreen />}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/login" element={<LoginScreen/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
