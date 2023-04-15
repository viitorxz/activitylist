import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { routes } from './routes'

async function bootstrapt() {
  const app = Fastify()
  app.register(fastifyCors, {
    origin: ['*'],
  })
  app.register(routes)

  app
    .listen({
      port: 3001,
    })
    .then(() =>
      console.log(
        `Running on port ${3001} [${JSON.stringify(app.server.address())}]`,
      ),
    )
}

bootstrapt()
