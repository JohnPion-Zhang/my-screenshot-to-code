import { http, HttpResponse } from 'msw'
import { mockGraphData } from './data'

export const handlers = [
  // Intercept the POST requests to our mock API
  http.post('/api/generate-graph', () => {
    // Respond with our mock data as a JSON object.
    return HttpResponse.json(mockGraphData)
  }),
]
