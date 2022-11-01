import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollTop from './components/universal/ScrollTop'
import RequireAuth from './components/universal/RequireAuth'
import NotFound from './components/universal/NotFound'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import LoginScreen from './screens/LoginScreen'
import OrdersScreen from './screens/OrdersScreen'
import CarriersScreen from './screens/CarriersScreen'
import ComponentsScreen from './screens/ComponentsScreen'
import SetupsScreen from './screens/SetupsScreen'
import UsersScreen from './screens/UsersScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <ScrollTop />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrdersScreen />} />
          <Route path="/carriers" element={<CarriersScreen />} />
          <Route path="/components" element={<ComponentsScreen />} />
          <Route path="/setups" element={<SetupsScreen />} />
          <Route path="/users" element={<UsersScreen />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
