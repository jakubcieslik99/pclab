import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import Header from './components/header/Header'
import HeaderButton from './components/header/HeaderButton'
import Footer from './components/footer/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  const { ref: footerRef, inView: isFooterVisible } = useInView()

  return (
    <BrowserRouter>
      <Header />
      <HeaderButton position={isFooterVisible ? 'absolute' : 'fixed'} />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>

      <Footer ref={footerRef} />
    </BrowserRouter>
  )
}

export default App
