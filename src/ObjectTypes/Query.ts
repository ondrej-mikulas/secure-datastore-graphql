/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T11:09:60+02:00
 * @Copyright: Technology Studio
 */

import { objectType, stringArg } from '@nexus/schema'
import { resolver as dataListResolver } from '../Resolvers/QueryDataListResolver'

export const Query = objectType({
  name: 'Query',
  definition (t) {
    t.field('dataList', {
      type: 'Store',
      list: true,
      args: {
        id: stringArg({ nullable: false }),
        decryption_key: stringArg({ nullable: false }),
      },
      resolve: async (_, args, ctx, info) => {
        return dataListResolver(_, args, ctx, info)
      },
    })
  },
})
