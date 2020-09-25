/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T11:09:43+02:00
 * @Copyright: Technology Studio
 */

import { JSONScalar } from './JsonScalar'
import { Mutation } from './Mutation'
import { Query } from './Query'
import { Store } from './Store'

export const objectTypeList = [
  JSONScalar,
  Mutation,
  Query,
  Store,
]
