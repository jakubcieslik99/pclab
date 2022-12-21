const createCommentErrors = {
  setupComment: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    maxLength: {
      value: 500,
      message: 'Maksymalna długość komentarza to 500 znaków.',
    },
  },
}

const createUpdateSetupErrors = {
  setupDescription: {
    maxLength: {
      value: 1000,
      message: 'Maksymalna długość opisu to 1000 znaków.',
    },
  },
}

export { createCommentErrors, createUpdateSetupErrors }
