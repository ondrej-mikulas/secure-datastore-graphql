/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-25T14:09:67+02:00
 * @Copyright: Technology Studio
 */

import { buildWhereConditionFromId } from './Setup';
import { InvalidInputError } from '../src/Errors/InvalidInputError';

test('DataList where condition builder no wildcard', async () => {
  const actual = buildWhereConditionFromId('a')
  const expected = { id: 'a'}
  expect(actual).toStrictEqual(expected)
})

test('DataList where condition builder single wildcard', async () => {
  const actual = buildWhereConditionFromId('*')
  const expected = { AND: [
    {
      id: {
        startsWith: ''
      },
    },
    {
      id: {
        endsWith: ''
      }
    },
    {
      idLength: {
        gte: 0
      }
    }
  ]}
  expect(actual).toStrictEqual(expected)
})

test('DataList where condition builder single wildcard in the end', async () => {
  const actual = buildWhereConditionFromId('aa*')
  const expected = { AND: [
    {
      id: {
        startsWith: 'aa'
      },
    },
    {
      id: {
        endsWith: ''
      }
    },
    {
      idLength: {
        gte: 2
      }
    }
  ]}
  expect(actual).toStrictEqual(expected)
})

test('DataList where condition builder single wildcard with string on beginning', async () => {
  const actual = buildWhereConditionFromId('*aaa')
  const expected = { AND: [
    {
      id: {
        startsWith: ''
      },
    },
    {
      id: {
        endsWith: 'aaa'
      }
    },
    {
      idLength: {
        gte: 3
      }
    }
  ]}
  expect(actual).toStrictEqual(expected)
})

test('DataList where condition builder single wildcard in the middle', async () => {
  const actual = buildWhereConditionFromId('a*bc')
  const expected = { AND: [
    {
      id: {
        startsWith: 'a'
      },
    },
    {
      id: {
        endsWith: 'bc'
      }
    },
    {
      idLength: {
        gte: 3
      }
    }
  ]}
  expect(actual).toStrictEqual(expected)
})

test('DataList where condition builder multiple wildcards', async () => {
  const actual = () => buildWhereConditionFromId('a*b*c')
  expect(actual).toThrow(InvalidInputError)
})
