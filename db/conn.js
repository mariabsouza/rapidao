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

const sequelize = new Sequelize('rapidao', '6yg79tjoepgf1oe0ocs3', 'pscale_pw_wgSz3QQR9rZ5MXhnoSF85MBqMIt3iaiUFz4i5hk5uxK', {
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