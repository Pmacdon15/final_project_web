// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/login/login-home-page/LoginHomePage.page';
import StudentLogin from './components/login/student-login/StudentLogin.page'
import AdminLogin from './components/login/admin-login/AdminLogin.page'
import StudentPortalDashboard from './components/student-portal/dashboard/dashboard.page';
import StudentPortalAllPrograms from './components/student-portal/all-programs/AllPrograms.page';
import StudentPortalMyPrograms from './components/student-portal/my-programs/MyPrograms.page';
import StudentPortalAllClasses from './components/student-portal/all-classes/AllClasses.page';
import StudentPortalComments from './components/student-portal/comments/Comments.page';
import AdminPortalComments from './components/admin-portal/comments/Comments.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-portal-dashboard/:email" element={<StudentPortalDashboard />} />
        <Route path="/student-portal-all-programs" element={<StudentPortalAllPrograms />} />
        <Route path="/student-portal-all-programs/:email" element={<StudentPortalAllPrograms />} />
        <Route path="/student-portal-my-programs/:email" element={<StudentPortalMyPrograms />} />
        <Route path="/student-portal-all-classes/" element={<StudentPortalAllClasses />} />
        <Route path="/student-portal-comments/:email" element={<StudentPortalComments />} />
        <Route path="/student-portal-comments/" element={<StudentPortalComments />} />
        <Route path="/admin-portal-comments/:email" element={<AdminPortalComments />} />
        {/* <Route path="/guest-login" element={<GuestLogin />} /> */}
      </Routes>      
    </div>
  );
}

export default App;
