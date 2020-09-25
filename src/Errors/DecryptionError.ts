/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-25T10:09:30+02:00
 * @Copyright: Technology Studio
 */

import { createError } from 'apollo-errors'

const DecryptionError = createError('DecryptionError', {
  message: 'Decryption error.',
  options: {
    showPath: true,
  },
  internalData: {
    key: 'decryption',
  },
})

export { DecryptionError }
