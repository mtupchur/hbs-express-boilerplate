module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_USER: process.env.DBUSER,
  DATABASE_PASS: process.env.DBPASS,
  DATABASE: process.env.DB,
  DBPORT: process.env.DBPORT,
  AWSUSER: process.env.AWSUSER,
  AWSPW: process.env.AWSPW
}