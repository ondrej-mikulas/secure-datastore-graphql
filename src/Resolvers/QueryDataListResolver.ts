/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T15:09:79+02:00
 * @Copyright: Technology Studio
 */

import { FieldResolver } from '@nexus/schema'
import { decrypt } from '../Api/EncryptionHelper'
import { DecryptionError } from '../Errors/DecryptionError'
import { handleError } from '../Api/ErrorHandlerHelper'
import { buildWhereConditionFromId } from '../Api/StoreHelper'
import { InvalidInputError } from '../Errors/InvalidInputError'

export const resolver: FieldResolver<'Query', 'dataList'> = async (parent, args, ctx) => {
  try {
    const { id } = args
    if (!id) {
      throw new InvalidInputError({
        message: 'Id can\'t be empty string.',
      })
    }
    const where = buildWhereConditionFromId(id)
    const encryptedDataList = await ctx.prisma.store.findMany({
      where,
    })

    let allValuesDecrypted = true
    const decryptedValues = []
    const notDecryptedIdList = []
    for (const encryptedData of encryptedDataList) {
      let value
      try {
        const decryptedValue = decrypt(encryptedData.value, args.decryption_key)
        value = JSON.parse(decryptedValue)
      } catch (error) {
        notDecryptedIdList.push(encryptedData.id)
        allValuesDecrypted = false
      }
      decryptedValues.push({
        id: encryptedData.id,
        value,
      })
    }
    if (allValuesDecrypted) {
      return decryptedValues
    } else {
      console.error(new DecryptionError({
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        message: 'Not correct decryption key \'' + args.decryption_key +
        '\' for ids: ' + notDecryptedIdList.join(','),
      }))
      return []
    }
  } catch (error) {
    handleError(error)
    return []
  }
}
