import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import Header from './components/header/Header'
import HeaderButton from './components/header/HeaderButton'
import Footer from './components/footer/Footer'
import HomeScreen from './screens/HomeScreen'
import StoreScreen from './screens/StoreScreen'
import SetupScreen from './screens/SetupScreen'

const App = () => {
  const { ref: footerRef, inView: isFooterVisible } = useInView()

  return (
    <BrowserRouter>
      <Header />
      <HeaderButton position={isFooterVisible ? 'absolute' : 'fixed'} />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/store" element={<StoreScreen />} />
        <Route path="/setup/:id" element={<SetupScreen />} />
      </Routes>

      <Footer ref={footerRef} />
    </BrowserRouter>
  )
}

export default App
