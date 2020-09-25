/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T13:09:09+02:00
 * @Copyright: Technology Studio
 */

import { createError } from 'apollo-errors'

const InvalidInputError = createError('InvalidInputError', {
  message: 'Invalid input error.',
  options: {
    showPath: true,
  },
  internalData: {
    key: 'invalid-input',
  },
})

export { InvalidInputError }
