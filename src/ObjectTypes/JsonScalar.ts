/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T12:09:44+02:00
 * @Copyright: Technology Studio
 */

import { scalarType } from '@nexus/schema'

export const JSONScalar = scalarType({
  name: 'JSON',
  asNexusMethod: 'json',
  serialize: (data: string) => JSON.parse(data),
  parseValue: (data: Record<string, unknown>) => JSON.stringify(data),
})
