/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-25T11:09:10+02:00
 * @Copyright: Technology Studio
 */

import { StoreWhereInput } from '../Model/Types'
import { InvalidInputError } from '../Errors/InvalidInputError'

const occurenciesList = (substring: string, string: string): number[] => {
  const a = []; let i = -1
  while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i)
  return a
}

export const buildWhereConditionFromId = (id: string): StoreWhereInput => {
  const wildcardIdList = occurenciesList('*', id)
  if (wildcardIdList.length > 1) {
    throw new InvalidInputError({ message: 'Not supported operation with multiple stars in id' })
  }
  let where: StoreWhereInput = {}
  if (wildcardIdList.length === 0) {
    where = {
      id,
    }
  } else {
    const prefix = id.substring(0, wildcardIdList[0])
    const suffix = id.substring(wildcardIdList[0] + 1, id.length)
    where = {
      AND: [
        {
          id: {
            startsWith: prefix,
          },
        },
        {
          id: {
            endsWith: suffix,
          },
        },
        {
          idLength: {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            gte: prefix.length + suffix.length,
          },
        },
      ],
    }
  }
  return where
}
