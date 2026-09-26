import express from 'express'
import mongoose from 'mongoose'
import './config/database.js'
import apiRouter from './routes/api.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173'

app.use(express.json())
app.use((request, response, next) => {
  response.vary('Origin')

  if (request.get('origin') === frontendOrigin) {
    response.setHeader('Access-Control-Allow-Origin', frontendOrigin)

    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
      response.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type')
      response.status(204).end()
      return
    }
  }

  next()
})
app.use('/api', apiRouter)

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl })
})

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
})