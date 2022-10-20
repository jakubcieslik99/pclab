import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollTop from './components/universal/ScrollTop'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import OrdersScreen from './screens/OrdersScreen'
import DeliveryMethodsScreen from './screens/DeliveryMethodsScreen'
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
        {/*RequireAuth*/}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/delivery-methods" element={<DeliveryMethodsScreen />} />
        <Route path="/components" element={<ComponentsScreen />} />
        <Route path="/setups" element={<SetupsScreen />} />
        <Route path="/users" element={<UsersScreen />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
