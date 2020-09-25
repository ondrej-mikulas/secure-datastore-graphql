
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema } from '@nexus/schema'

import { objectTypeList } from './ObjectTypes'

export const schema = makeSchema({
  types: [...objectTypeList],
  plugins: [nexusSchemaPrisma()],
  outputs: {
    // eslint-disable-next-line no-path-concat
    schema: __dirname + '/../schema.graphql',
    // eslint-disable-next-line no-path-concat
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
