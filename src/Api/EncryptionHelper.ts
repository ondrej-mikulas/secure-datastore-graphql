/*
 * @Author: Ondrej Mikulas <ondrej.mikulas@technologystudio.sk>
 * @Date: 2020-09-24T12:09:52+02:00
 * @Copyright: Technology Studio
 */

import CryptoJS from 'crypto-js'

const aesKeyFromString = (key: string): string => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const password = process.env.ENCRYPTION_KEY_SALT + key
  const passwordBytes = CryptoJS.enc.Utf16LE.parse(password)
  const sha1Hash = CryptoJS.SHA1(passwordBytes)
  const sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64)
  // we are getting only the first 8 chars for actual key generation
  const sha1HashToBase64Short = sha1HashToBase64// .substring(0, 8)
  const aesKey = CryptoJS.enc.Utf16.parse(sha1HashToBase64Short)
  return aesKey
}

export const encrypt = (message: string, encryptionKey: string): string => {
  const plainText = message
  const aesKey = aesKeyFromString(encryptionKey)
  // NOTE: that we are being lazy and the encryption key itself
  // is used as the initialization vector for AES
  const aesIv = aesKey
  const x = CryptoJS.AES.encrypt(plainText, aesKey, {
    iv: aesIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const cryptHex = x.toString()
  return cryptHex
}

export const decrypt = (encryptedMessage: string, decryptionKey: string): string => {
  const aesKey = aesKeyFromString(decryptionKey)
  const aesIv = aesKey
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, aesKey, {
    iv: aesIv,
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
