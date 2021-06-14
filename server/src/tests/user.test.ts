import { app } from '../app'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { User } from '../models/user'

const api = supertest(app)

describe('User tests', () => {

  beforeAll(async () => {
    await User.deleteMany()
  })

  test("post user/register",
    async () => {
      const response = await api
        .post("/user/register")
        .send({
          "username": "test",
          "password": "123"
        })
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('User created successfully')
    })

  test("post user/register - duplicate",
    async () => {
      const response = await api
        .post("/user/register")
        .send({
          "username": "test",
          "password": "123"
        })
      expect(response.body.error).toEqual('User already exists')
      expect(response.statusCode).toBe(409);
    })

  test("post user/login - incorrect",
    async () => {
      const response = await api
        .post("/user/login")
        .send({
          "username": "nate",
          "password": "abc"
        })
      expect(response.statusCode).toBe(401);
    })

  test("post user/login",
    async () => {
      const response = await api
        .post("/user/login")
        .send({
          "username": "test",
          "password": "123"
        })
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('Successfully authenticated')
    })

  test("get user", async () => {
    await api
      .get('/user')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})