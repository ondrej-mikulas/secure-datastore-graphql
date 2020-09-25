/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T13:09:88+02:00
 * @Copyright: Technology Studio
 */

import {
  isInstance as isApolloErrorInstance,
  formatError as formatApolloError,
} from 'apollo-errors'

/* eslint  @typescript-eslint/explicit-module-boundary-types: 0, @typescript-eslint/no-explicit-any: 0 */
export function formatError (error: any): any {
  const { originalError } = error

  if (originalError && isApolloErrorInstance(originalError)) {
    // log internalData to stdout but not include it in the formattedError
    console.error(
      JSON.stringify({
        type: 'error',
        data: originalError.data,
        internalData: originalError.internalData,
        stack: originalError.stack,
      }),
    )
  }
  const formattedApolloError = formatApolloError(error)
  const validationPath = originalError?.internalData?.validationPath
  if (formattedApolloError.path && validationPath) {
    formattedApolloError.path = formattedApolloError.path.concat(validationPath)
  }
  return {
    ...formattedApolloError,
    key: originalError?.internalData?.key,
    type: originalError?.internalData?.type,
  }
}
