import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { OtpVerification } from './pages/auth/OtpVerification';
import { Home } from './pages/home';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    
    <ThemeProvider>
      <Routes>
        <Route>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/otp-verify' element={<OtpVerification />} />
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
