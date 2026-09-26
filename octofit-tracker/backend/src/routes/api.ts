import { Router, type Request, type Response } from 'express'
import type { Model } from 'mongoose'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models/index.js'

const apiRouter = Router()

function collectionRouter<T>(model: Model<T>) {
  const router = Router()

  router.get('/', async (_request: Request, response: Response) => {
    response.json(await model.find({}).lean())
  })

  router.get('/:id', async (request: Request, response: Response) => {
    const entry = await model.findById(request.params.id).lean()
    if (!entry) {
      response.status(404).json({ error: 'Not found' })
      return
    }
    response.json(entry)
  })

  router.post('/', async (request: Request, response: Response) => {
    if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' })
      return
    }
    response.status(201).json(await model.create(request.body))
  })

  router.patch('/:id', async (request: Request, response: Response) => {
    if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' })
      return
    }
    const entry = await model.findByIdAndUpdate(request.params.id, request.body, {
      returnDocument: 'after',
      runValidators: true,
    }).lean()
    if (!entry) {
      response.status(404).json({ error: 'Not found' })
      return
    }
    response.json(entry)
  })

  router.delete('/:id', async (request: Request, response: Response) => {
    const entry = await model.findByIdAndDelete(request.params.id)
    if (!entry) {
      response.status(404).json({ error: 'Not found' })
      return
    }
    response.status(204).end()
  })

  return router
}

const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

apiRouter.get('/config', (_request, response) => {
  response.json({ apiBaseUrl })
})

apiRouter.use('/users', collectionRouter(User))
apiRouter.use('/teams', collectionRouter(Team))
apiRouter.use('/activities', collectionRouter(Activity))
apiRouter.use('/leaderboard', collectionRouter(LeaderboardEntry))
apiRouter.use('/workouts', collectionRouter(Workout))

export default apiRouter