import {  Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { OtpVerification } from './pages/auth/OtpVerification';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from './pages/home/Dashboard';
import BrandCampaigns from './pages/home/BrandCampaigns';
import { AppLayout } from './layout/AppLayout';
import Brands from './pages/home/Brands';
import Settings from './pages/settings/Settings';
import { Home } from './pages/home';

function App() {
  return (
    <AuthProvider>
		<ThemeProvider>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>{" "}
			<Routes>
				<Route>
					<Route path='/' element={<SignIn />} />
					<Route path='/login' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/otp-verify' element={<OtpVerification />} />
				</Route>

				<Route
					path="/home"
					element={
					<ProtectedRoute>
						<AppLayout />
					</ProtectedRoute>
					}
				>
					<Route
						index
						element={
							<ProtectedRoute>
								<Dashboard />
								{/* <Home /> */}
							</ProtectedRoute>
						}
					/>

					<Route
						path="campaign/:id/title/:title"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>

					<Route
						path="brands"
						element={
							<ProtectedRoute>
								<Brands />
							</ProtectedRoute>
						}
					/>

					<Route
						path="brand/:id"
						element={
							<ProtectedRoute>
								<BrandCampaigns />
							</ProtectedRoute>
						}
					/>
					<Route
						path="settings"
						element={
							<ProtectedRoute>
								<Settings  />
							</ProtectedRoute>
						}
					/>
				
					
					
				</Route>

				{/* Fallbacks */}
				{/* <Route path="/"  element={<Navigate to="/login" replace />} />
				<Route path="*"  element={<Navigate to="/login" replace />} /> */}
			</Routes>
		</ThemeProvider>
    </AuthProvider>
  );
}

export default App;
