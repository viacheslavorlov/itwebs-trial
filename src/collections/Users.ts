import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 4, // Automatically lock a user out after X amount of failed logins
    lockTime: process.env.NODE_ENV === 'development' ? 10 : 6000 * 1000, // Time period to allow the max login attempts
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
