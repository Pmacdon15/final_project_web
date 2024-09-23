// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import BVCImage from './components/bvc-image/BVCImage.component';
import HomePage from './components/home-page/HomePage.page';
import StudentLogin from './components/home-page/student-login/StudentLogin.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        {/* <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-login" element={<GuestLogin />} /> */}
      </Routes>      
    </div>
  );
}

export default App;
