const stripeOptions = {
  locale: 'pl',
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap' }],
  appearance: {
    theme: 'none',
    variables: {
      fontFamily: 'Poppins, sans-serif',
      colorIcon: '#FFFFFF',
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
        backgroundColor: '#4b335a',
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
      '.RedirectText': {
        color: '#9CA3A6',
        fontSize: '12px',
      },
    },
  },
}

export default stripeOptions
