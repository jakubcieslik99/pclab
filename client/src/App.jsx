import { useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { useInView } from 'react-intersection-observer'
import { useAppSelector, useAppDispatch } from './features/store'
import { getLikedSetups } from './features/setupsSlices/manageLikedSetups'
import ScrollTop from './components/universal/ScrollTop'
import RequireAuth from './components/universal/RequireAuth'
import NotFound from './components/universal/NotFound'
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
  // variables
  const getLikedSetupsAbort = useRef()

  const { userInfo } = useAppSelector(state => state.manageAccount)
  const dispatch = useAppDispatch()

  const location = window.location.href.substring(window.location.href.lastIndexOf('/'))
  const { ref: footerRef, inView: isFooterVisible } = useInView()

  // useEffects
  useEffect(() => {
    if (userInfo) {
      const getLikedSetupsPromise = dispatch(getLikedSetups())
      getLikedSetupsAbort.current = getLikedSetupsPromise.abort
    }
    return () => getLikedSetupsAbort.current && getLikedSetupsAbort.current()
  }, [userInfo, dispatch])

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

        <Route element={<RequireAuth />}>
          <Route path="/compose" element={<ComposeScreen />} />
          <Route path="/placeorder/:id" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen stripePromise={stripePromise} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer ref={footerRef} />
    </BrowserRouter>
  )
}

export default App
