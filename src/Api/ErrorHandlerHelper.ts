/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-25T11:09:68+02:00
 * @Copyright: Technology Studio
 */

import { InvalidInputError } from '../Errors/InvalidInputError'
import { InternalError } from '../Errors/InternalError'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const handleError = (error: any): void => {
  if (error instanceof InvalidInputError) {
    throw error
  }
  if (error?.code) {
    // Prisma error has folowing error codes
    const regex = /^P\d{4}$/
    if (regex.test(error.code)) {
      console.log('Prisma specific error')
      console.error(error)
      throw new InternalError()
    }
  }
  console.error(error)
}
