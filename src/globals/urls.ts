// change this line to switch between local and production development
let ENVIRONMENT = 'production'

// change this line too
const URLS = ENVIRONMENT === 'local' ? (
  {
    BASE: "http://localhost:3001",
    SOCKET: "ws://localhost:8050/ws",
    REST: "http://localhost:8050",
  }
) : (
  {
    BASE: "https://linehayat-volunteer.netlify.app",
    SOCKET: "wss://linehayatest.herokuapp.com/ws",
    REST: "https://linehayatest.herokuapp.com",
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