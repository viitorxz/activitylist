import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

export const routes = async (app: FastifyInstance) => {
  app.get('/activities', async (req, reply) => {
    const activity_list = await prisma.activity.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
    if (!activity_list && activity_list.length < 1) return 'List is empty'

    return activity_list
  })

  app.get('/activities/:activityId', async (req, reply) => {
    const paramsSchema = z.object({
      activityId: z
        .string()
        .nonempty({ message: 'ActivityId is invalid' })
        .uuid({ message: 'ActivityId is invalid' }),
    })

    const { activityId } = paramsSchema.parse(req.params)

    try {
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityId,
        },
      })

      if (!activity)
        return reply.status(404).send({ error: 'Activity not found' })

      return activity
    } catch (err) {
      throw Error(err)
    }
  })

  app.post('/activities', async (req, reply) => {
    const bodySchema = z.object({
      activity_name: z
        .string()
        .nonempty({ message: 'Activity name is required' })
        .min(3, { message: 'Min lenght is 3' })
        .max(100, { message: 'Max lenght is 100' }),
      createdAt: z.string().nonempty({ message: 'Created at is required' }),
    })

    const { activity_name, createdAt } = bodySchema.parse(req.body)

    try {
      const activity = await prisma.activity.create({
        data: {
          id: uuid(),
          createdAt: dayjs(createdAt).toDate(),
          name: activity_name,
        },
      })

      return reply.status(201).send(activity)
    } catch (error) {
      throw Error(error)
    }
  })

  app.patch('/activities/done/:activityId', async (req, reply) => {
    const paramsSchema = z.object({
      activityId: z
        .string()
        .nonempty({ message: 'ActivityId is invalid' })
        .uuid({ message: 'ActivityId is invalid' }),
    })

    const { activityId } = paramsSchema.parse(req.params)

    try {
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityId,
        },
      })

      if (!activity)
        return reply.status(404).send({ error: 'Activity not found' })

      const activityUpdated = await prisma.activity.update({
        where: {
          id: activityId,
        },
        data: {
          doneAt: new Date().toISOString(),
        },
      })

      return reply.status(200).send(activityUpdated)
    } catch (err) {
      throw Error(err)
    }
  })

  app.delete('/activities/:activityId', async (req, reply) => {
    const paramsSchema = z.object({
      activityId: z
        .string()
        .nonempty({ message: 'ActivityId is invalid' })
        .uuid({ message: 'ActivityId is invalid' }),
    })

    const { activityId } = paramsSchema.parse(req.params)

    try {
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityId,
        },
      })

      if (!activity)
        return reply.status(404).send({ error: 'Activity not found' })

      await prisma.activity.delete({
        where: {
          id: activity.id,
        },
      })
    } catch (err) {
      throw Error(err)
    }
  })
}
