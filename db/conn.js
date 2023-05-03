const {Sequelize} = require('sequelize')


// const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
//   host: process.env.host,
//   dialect: 'mysql',
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: true,
//     },
//   }
// })

const sequelize = new Sequelize('rapidao', 'on4ztacl14pv3bwdtj3o', 'pscale_pw_wY67DKXRZP77hm9OLWi1QWA5fAXbuQ4dC35lBQ577fD', {
  host: 'aws.connect.psdb.cloud',
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
})

try {
  sequelize.authenticate()
  console.log('Conectamos com sucesso')
} catch(err) {
  console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize