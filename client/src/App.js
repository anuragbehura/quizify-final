// import { Button } from 'antd';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textelements.css';
import './stylesheets/layout.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/common/Login';
import Landing from './pages/common/Landing/Landing';
import Register from './pages/common/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/common/Home';
import OTP from './pages/common/OTP'
import Exams from './pages/admin/Exams';
import AddEditExam from './pages/admin/Exams/AddEditExam';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import WriteExam from './pages/user/WriteExam';
import UserReports from './pages/user/UserReports';
import AdminReports from './pages/admin/AdminReports';
import About from './pages/common/About';
function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About/>} />
          <Route path='/otp-verify' element={<OTP />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* user routes */}

          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />


          <Route
            path='/user/write-exam/:id'
            element={
              <ProtectedRoute>
                <WriteExam />
              </ProtectedRoute>
            }
          />

          <Route
            path='/user/reports'
            element={
              <ProtectedRoute>
                <UserReports />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path='/admin/exams'
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin/exams/add'
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/exams/edit/:id'
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin/reports'
            element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
