import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import OrdersScreen from './screens/OrdersScreen'
import DeliveryMethodsScreen from './screens/DeliveryMethodsScreen'
import ComponentsScreen from './screens/ComponentsScreen'
import ConfigsScreen from './screens/ConfigsScreen'
import UsersScreen from './screens/UsersScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        {/*RequireAuth*/}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/delivery-methods" element={<DeliveryMethodsScreen />} />
        <Route path="/components" element={<ComponentsScreen />} />
        <Route path="/configs" element={<ConfigsScreen />} />
        <Route path="/users" element={<UsersScreen />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
