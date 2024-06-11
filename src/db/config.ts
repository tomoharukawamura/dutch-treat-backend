import { 
  User,
  Transaction,
  TransactionResult,
  Theme,
  Invitation
} from './entities'

const commonConfig = {
  type: 'mysql',
  database: 'dutch-treat-db',
  entities: [
    Invitation,
    User,
    Transaction,
    TransactionResult,
    Theme
  ]
}

const devConfig = {
  ...commonConfig,
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  synchronize: true,
}

const prodConfig = {
  ...commonConfig,
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
}

export default {
  dev: devConfig,
  prod: prodConfig
}

