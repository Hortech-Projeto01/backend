/* eslint-disable quote-props */
module.exports = {
  'development': {
    'username': process.env.DB_USER_DEV,
    'password': process.env.DB_PASS_DEV,
    'database': process.env.DB_NAME_DEV,
    'host': process.env.DB_HOST_DEV,
    'dialect': 'postgres'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'sqlite',
    'storage': './__tests__/database.sqlite'
  },
  'production': {
    'username': process.env.DB_USER_PRD,
    'password': process.env.DB_PASS_PRD,
    'database': process.env.DB_NAME_PRD,
    'host': process.env.DB_HOST_PRD,
    'dialect': 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
