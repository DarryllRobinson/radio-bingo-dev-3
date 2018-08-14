export const AUTH_CONFIG = {
  domain: 'fcmcms.eu.auth0.com',
  clientId: 'W9w3YzgENsp1zkT40TAUr7VxYVcyj6iN',
  callbackUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://stillproud.com/callback',
}
