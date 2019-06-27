
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    _jwtSecret: process.env.JWT_SECRET || "1q2w3e4r5t6y7u8i9o0p1q2w3e4r5t6y7u8i9o0pp0o9i8u7y6t5r4e3w2q1",
    get jwtSecret() {
      return this._jwtSecret;
    },
    set jwtSecret(value) {
      this._jwtSecret = value;
    },
   
  }
  
  export default config