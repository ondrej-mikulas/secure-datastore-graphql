/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T11:09:79+02:00
 * @Copyright: Technology Studio
 */

import { objectType } from '@nexus/schema'

export const Store = objectType({
  name: 'Store',
  definition (t) {
    t.id('id')
    t.field('value', {
      type: 'JSON',
    })
  },
})
