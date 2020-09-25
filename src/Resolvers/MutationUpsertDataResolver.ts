/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T15:09:79+02:00
 * @Copyright: Technology Studio
 */

import { FieldResolver } from '@nexus/schema'
import { encrypt } from '../Api/EncryptionHelper'
import { handleError } from '../Api/ErrorHandlerHelper'
import { InvalidInputError } from '../Errors/InvalidInputError'

export const resolver: FieldResolver<'Mutation', 'upsertData'> = async (parent, args, ctx) => {
  try {
    if (args.id.length === 0) {
      throw new InvalidInputError({
        message: 'id can\'t be empty string',
      })
    }
    if (args.id.includes('*')) {
      throw new InvalidInputError({
        message: 'id can\'t contain wildcard character',
      })
    }
    const encryptedValue = encrypt(JSON.stringify(args.value), args.encryption_key)
    const store = await ctx.prisma.store.upsert({
      create: {
        id: args.id,
        idLength: args.id.length,
        value: encryptedValue,
      },
      update: {
        value: encryptedValue,
        idLength: args.id.length,
      },
      where: {
        id: args.id,
      },
    })
    return store.id
  } catch (error) {
    handleError(error)
    return ''
  }
}
