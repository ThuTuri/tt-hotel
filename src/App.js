import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import LoginScreen from './screens/LoginScreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import LandingScreen from './screens/LandingScreen';
import AboutScreen from './screens/AboutScreen'
import Footer from './components/Footer';
import ContactScreen from './screens/ContactScreen';

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
        <Route path="/profile" element={<Profilescreen/>}/>
        <Route path="/about" element={<AboutScreen/>}/>
        <Route path="/contact" element={<ContactScreen/>}/>
        <Route path="/admin" element={<Adminscreen/>}/>
        <Route path="/" element={<LandingScreen/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
