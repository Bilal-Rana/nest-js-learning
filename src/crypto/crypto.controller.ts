import { Body, Controller, Post } from "@nestjs/common";
import { CryptoService } from "./crypto.service";

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Post('encrypt')
  async encrypt(@Body() body: { text: string }) {
    const result = await this.cryptoService.encryptToBase64(body.text);
    return {
      original: body.text,
      encrypted: result.cipherText,
      iv: result.iv,
      note: 'Save both encrypted and iv to decrypt later',
    };
  }

  @Post('decrypt')
  async decrypt(@Body() body: { cipherText: string; iv: string }) {
    const plainText = await this.cryptoService.decryptFromBase64(body.cipherText, body.iv);
    return { decrypted: plainText };
  }
}