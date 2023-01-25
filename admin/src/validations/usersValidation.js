const updateUserErrors = {
  userIsAdmin: {
    pattern: {
      value: /^\b(no|yes)\b/,
      message: 'Niepoprawny format rangi użytkownika.',
    },
  },
}

export { updateUserErrors }
