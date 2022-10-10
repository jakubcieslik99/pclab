import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { useInView } from 'react-intersection-observer'
import ScrollTop from './components/universal/ScrollTop'
import Header from './components/header/Header'
import HeaderButton from './components/header/HeaderButton'
import Footer from './components/footer/Footer'
import HomeScreen from './screens/HomeScreen'
import StoreScreen from './screens/StoreScreen'
import SetupScreen from './screens/SetupScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ComposeScreen from './screens/ComposeScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

const stripePromise = loadStripe(import.meta.env.VITE_API_STRIPE)

const App = () => {
  const location = window.location.href.substring(window.location.href.lastIndexOf('/'))
  const { ref: footerRef, inView: isFooterVisible } = useInView()

  return (
    <BrowserRouter>
      <Header />
      {location !== '/login' && location !== '/register' && (
        <HeaderButton position={isFooterVisible ? 'absolute' : 'fixed'} />
      )}

      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/store" element={<StoreScreen />} />
        <Route path="/setup/:id" element={<SetupScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile/:id" element={<ProfileScreen />} />
        {/*RequireAuth*/}
        <Route path="/compose" element={<ComposeScreen />} />
        <Route path="/placeorder/:id" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen stripePromise={stripePromise} />} />
      </Routes>

      <Footer ref={footerRef} />
    </BrowserRouter>
  )
}

export default App
