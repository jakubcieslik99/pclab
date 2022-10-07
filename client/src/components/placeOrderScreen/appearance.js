const appearance = {
  theme: 'none',
  variables: {
    fontFamily: 'Poppins, sans-serif',
  },
  rules: {
    '.Label': {
      color: '#FFFFFF',
      fontSize: '14px',
    },
    '.Input': {
      color: '#FFFFFF',
      border: '2px solid #FFFFFF',
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      paddingTop: '11px',
      paddingBottom: '11px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    '.Input::placeholder': {
      color: '#9CA3A6',
    },
    '.Input:focus': {
      outline: 'none',
    },
    '.Input::selection': {
      color: '#000',
    },
    '.RedirectText': {
      color: '#9CA3A6',
    },
  },
}

export default appearance
