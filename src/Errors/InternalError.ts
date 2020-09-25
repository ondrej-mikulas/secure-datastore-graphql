/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-25T11:09:42+02:00
 * @Copyright: Technology Studio
 */

import { createError } from 'apollo-errors'

const InternalError = createError('InternalError', {
  message: 'Internal error.',
  options: {
    showPath: true,
  },
  internalData: {
    key: 'internal',
  },
})

export { InternalError }
