/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-25T14:09:45+02:00
 * @Copyright: Technology Studio
 */

import { encrypt, decrypt} from './Setup'

test('Encryption', async () => {
  const encryptedValue = encrypt('1234', '1234')
  expect(encryptedValue).toBe('POoXj1hp/7vs+fz+odIkmw==')
})

test('Decryption', async () => {
  const decryptedValue = decrypt('POoXj1hp/7vs+fz+odIkmw==', '1234')
  expect(decryptedValue).toBe('1234')
})
