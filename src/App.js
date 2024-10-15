// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/login/login-home-page/LoginHomePage.page';
import StudentLogin from './components/login/student-login/StudentLogin.page';
import AdminLogin from './components/login/admin-login/AdminLogin.page';
import StudentPortalDashboard from './components/student-portal/dashboard/dashboard.page';
import StudentPortalAllPrograms from './components/student-portal/all-programs/AllPrograms.page';
import StudentPortalAllClasses from './components/student-portal/all-classes/AllClasses.page';
import StudentPortalMyClasses from './components/student-portal/my-classes/MyClasses.page';
import StudentPortalComments from './components/student-portal/comments/Comments.page';
import AdminPortalComments from './components/admin-portal/comments/Comments.page';
import StudentSignupForm from './components/student-signup-portal/StudentSignUp.page';

import RouteWrapper from './components/route-wrapper';
import NotAllowed from './components/not-allowed/NotAllowed.page';
import PageNotFound from './components/page-not-found';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/student-signup" element={<StudentSignupForm />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Student Routes */}
                <Route path="/student">
                    <Route
                        path="dashboard"
                        element={
                            <RouteWrapper>
                                <StudentPortalDashboard />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="all-programs"
                        element={
                            <RouteWrapper>
                                <StudentPortalAllPrograms />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="all-classes"
                        element={
                            <RouteWrapper>
                                <StudentPortalAllClasses />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="my-classes"
                        element={
                            <RouteWrapper>
                                <StudentPortalMyClasses />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="comments"
                        element={
                            <RouteWrapper>
                                <StudentPortalComments />
                            </RouteWrapper>
                        }
                    />
                </Route>
                {/* Admin Routes */}
                <Route path="/admin">
                    <Route
                        path="dashboard"
                        element={
                            <RouteWrapper>
                                <StudentPortalDashboard />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="comments"
                        element={
                            <RouteWrapper adminOnly>
                                <AdminPortalComments />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="all-programs"
                        element={
                            <RouteWrapper>
                                <StudentPortalAllPrograms />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="all-classes"
                        element={
                            <RouteWrapper>
                                <StudentPortalAllClasses />
                            </RouteWrapper>
                        }
                    />
                </Route>
                <Route path="/guest">
                    <Route
                        path="comments"
                        element={
                            <RouteWrapper isGuest>
                                <StudentPortalComments />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="all-programs"
                        element={
                            <RouteWrapper isGuest>
                                <StudentPortalAllPrograms />
                            </RouteWrapper>
                        }
                    />
                    <Route
                        path="all-classes"
                        element={
                            <RouteWrapper isGuest>
                                <StudentPortalAllClasses />
                            </RouteWrapper>
                        }
                    />
                </Route>

                <Route
                    path="not-allowed"
                    element={
                        <RouteWrapper>
                            <NotAllowed />
                        </RouteWrapper>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
