/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T11:09:45+02:00
 * @Copyright: Technology Studio
 */

import {
  objectType,
  stringArg,
  arg,
} from '@nexus/schema'

import { resolver as upsertDataResolver } from '../Resolvers/MutationUpsertDataResolver'

export const Mutation = objectType({
  name: 'Mutation',
  definition (t) {
    t.field('upsertData', {
      type: 'ID',
      args: {
        id: stringArg({ nullable: false }),
        encryption_key: stringArg({ nullable: false }),
        value: arg({ type: 'JSON', nullable: false }),
      },
      resolve: async (_, args, ctx, info) => {
        return upsertDataResolver(_, args, ctx, info)
      },
    })
  },
})
