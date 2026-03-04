import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly password = 'my-secret-password-change-in-prod';

  // ── Generate a key from a password using scrypt ──
  private async generateKey(): Promise<Buffer> {
    return (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    // scrypt args: (password, salt, keyLength)
    // keyLength 32 bytes = 256 bits → required for aes-256
  }

  // ── Encrypt plain text ──
  async encrypt(plainText: string): Promise<{ encryptedText: Buffer; iv: Buffer }> {
    const iv = randomBytes(16); // Initialization Vector — unique per encryption
    const key = await this.generateKey();

    const cipher = createCipheriv(this.algorithm, key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(plainText),  // encrypt the data
      cipher.final(),             // flush remaining bytes
    ]);

    return { encryptedText, iv };
    // IMPORTANT: Save iv alongside encryptedText — you need it to decrypt!
  }

  // ── Decrypt encrypted buffer ──
  async decrypt(encryptedText: Buffer, iv: Buffer): Promise<string> {
    const key = await this.generateKey();

    const decipher = createDecipheriv(this.algorithm, key, iv);

    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText.toString(); // convert Buffer → string
  }

  // ── Encrypt to Base64 string (easier to store in DB) ──
  async encryptToBase64(plainText: string): Promise<{ cipherText: string; iv: string }> {
    const { encryptedText, iv } = await this.encrypt(plainText);
    return {
      cipherText: encryptedText.toString('base64'),
      iv: iv.toString('base64'),
    };
  }

  // ── Decrypt from Base64 string ──
  async decryptFromBase64(cipherText: string, iv: string): Promise<string> {
    const encryptedBuffer = Buffer.from(cipherText, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');
    return this.decrypt(encryptedBuffer, ivBuffer);
  }
}