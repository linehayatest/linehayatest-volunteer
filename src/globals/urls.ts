type EnvType = 'local' | 'production'

const LOCAL: EnvType = 'local'
const PRODUCTION: EnvType = 'production'

// change this line to switch between local and production development
const ENVIRONMENT: EnvType = 'production'

// change this line too
const URLS = ENVIRONMENT === PRODUCTION ? (
  {
    BASE: "http://localhost:3001",
    SOCKET: "ws://localhost:8050/ws",
    REST: "http://localhost:8050",
  }
) : (
  {
    BASE: "https://linehayat-volunteer.vercel.app",
    SOCKET: "wss://linehayat-server-1.herokuapp.com/ws",
    REST: "https://linehayat-server-1.herokuapp.com",
  }
)

const BASE_URL = URLS.BASE
const SOCKET_URL = URLS.SOCKET
const REST_URL = URLS.REST

const Auth0 = Object.freeze({
  DOMAIN: "dev-spzi21ij.us.auth0.com",
  CLIENT_ID: "fTCvhcvDrzkm6JTq4VpyvvVxuLomJdmi",
  REDIRECT_URI: BASE_URL,
})

export {
  BASE_URL,
  SOCKET_URL,
  REST_URL,
  Auth0,
}