import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollTop = props => {
  //variables
  const location = useLocation()

  //useEffects
  useEffect(() => {
    //window.scrollTo(0, 0, 'smooth')
    document.body.scrollTo(0, 0, 'instant')
  }, [location])

  return props.children ? <>{props.children}</> : null
}

export default ScrollTop
