const { Pool } = require('pg');

// const BRIAN_URI = 'postgres://assojzyg:N8mhtCF41OW-ZC8BPpZAHq8w6MPsyHc-@mahmud.db.elephantsql.com/assojzyg';
PG_URI = 'postgres://lbzjutee:4K8cxPaxAgA-KFEQhBOQiWj649WIhCrD@kashin.db.elephantsql.com/lbzjutee';
PSW = '4K8cxPaxAgA-KFEQhBOQiWj649WIhCrD'
// console.log('URI: ', process.env.PG_URI)

const pool = new Pool({
  connectionString: PG_URI,
  password: PSW,
  port: 3000
});



module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
