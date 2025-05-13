const stripeOptions = {
  locale: 'pl',
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap' }],
  appearance: {
    theme: 'none',
    variables: { fontFamily: 'Poppins, sans-serif', colorIcon: '#ffffff', colorIconTabSelected: '#ffffff' },
    rules: {
      '.Tab': { color: '#ffffff', border: '2px solid #ffffff', borderRadius: '12px', backgroundColor: '#4b335a' },
      '.Tab--selected': { color: '#ffffff', border: '2px solid #ffffff', backgroundColor: '#594567' },
      '.Tab:focus': { outline: 'none' },
      '.Label': { color: '#ffffff', fontSize: '14px' },
      '.Input': {
        color: '#ffffff',
        border: '2px solid #ffffff',
        borderRadius: '12px',
        backgroundColor: '#4b335a',
        paddingTop: '11px',
        paddingBottom: '11px',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
      '.Input::placeholder': { color: '#9ca3a6' },
      '.Input:focus': { outline: 'none' },
      '.Input--invalid': { color: '#ffffff' },
      '.Error': {
        color: '#b91c1c',
        fontWeight: '600',
        fontSize: '14px',
        border: '2px solid #dc2626',
        borderRadius: '12px',
        backgroundColor: '#fca5a5',
        marginTop: '5px',
        paddingTop: '4px',
        paddingBottom: '5px',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
      '.RedirectText': { color: '#9ca3a6', fontSize: '12px' },
    },
  },
}

export default stripeOptions
