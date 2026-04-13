require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: process.env.NODE_ENV == 'production' 
        ? process.env.FRONTEND_URL_PROD 
        : process.env.FRONTEND_URL_DEV,

  credentials: true
}

// const corsOptions = {
//   // Vamos chumbhar a URL aqui por enquanto
//   origin: 'http://localhost:3000', 
//   credentials: true
// }

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('CONECTADO AO MONGODB COM SUCESSO'))
  .catch((err) => console.error('ERRO AO CONECTAR COM O MONGODB:', err))

const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/categories')

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER RODANDO NA PORTA: ${PORT}`)
});