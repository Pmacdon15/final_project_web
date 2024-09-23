// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/login/login-home-page/LoginHomePage.page';
import StudentLogin from './components/login/student-login/StudentLogin.page'
import AdminLogin from './components/login/admin-login/AdminLogin.page'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* <Route path="/guest-login" element={<GuestLogin />} /> */}
      </Routes>      
    </div>
  );
}

export default App;
