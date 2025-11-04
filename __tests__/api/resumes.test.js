// Mock fs module before importing handler
jest.mock('fs')
jest.mock('path')

import handler from '@/pages/api/resumes/index'

describe('Resumes API', () => {
  let req, res

  beforeEach(() => {
    req = {
      method: 'GET',
      query: {},
      body: {},
    }
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    }
    
    // Mock fs functions
    const fs = require('fs')
    fs.existsSync = jest.fn(() => true)
    fs.mkdirSync = jest.fn()
    fs.readdirSync = jest.fn(() => [])
    fs.readFileSync = jest.fn()
    fs.writeFileSync = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns list of resumes on GET', async () => {
    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([])
  })

  it('creates new resume on POST', async () => {
    req.method = 'POST'
    req.body = {
      name: 'New Resume',
      template: 'classic',
    }

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        name: 'New Resume',
      })
    )
  })

  it('returns 405 for unsupported methods', async () => {
    req.method = 'DELETE'

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(405)
  })
})
