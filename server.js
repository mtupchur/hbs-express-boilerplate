const knex = require('knex');
const app = require('./src/app');
const {
    PORT,
    DATABASE_USER,
    DATABASE_PASS,
    DATABASE,
    DBPORT
} = require('./src/config');


db = knex({
    client: 'pg',
    connection: `postgres://${DATABASE_USER}:${DATABASE_PASS}@sc-prod-db.exactix811.com:${DBPORT}/${DATABASE}`
}) 

app.set('db',db)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:8000`)
})