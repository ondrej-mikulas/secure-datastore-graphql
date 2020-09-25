import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'
import { formatError } from './Errors/FormatError'

new ApolloServer({
  schema,
  context: createContext,
  playground: {
    endpoint: '/',
  },
  formatError,
}).listen(
  { port: 4000 },
  () =>
    console.log(
      '🚀 Server ready at: http://localhost:4000',
    ),
)
  .catch(err => console.error('Error on startup', err))
