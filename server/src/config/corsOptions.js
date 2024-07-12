import { config } from './utilities'

const allowedOrigins = [config.API_URL, config.APP_URL, config.ADMINPANEL_URL]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
  credentials: true,
  maxAge: 3600,
}

export default corsOptions
