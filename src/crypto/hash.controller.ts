import { Body, Controller, Post } from "@nestjs/common";
import { HashService } from "./hash.service";

@Controller('hash')
export class HashController {
  constructor(private hashService: HashService) {}

  @Post('hash-password')
  async hashPassword(@Body() body: { password: string }) {
    const hash = await this.hashService.hashPassword(body.password);
    return {
      original: body.password,
      hash,
      rounds: this.hashService.getHashRounds(hash),
    };
  }

  @Post('verify-password')
  async verifyPassword(@Body() body: { password: string; hash: string }) {
    const isMatch = await this.hashService.comparePassword(body.password, body.hash);
    return { isMatch };
  }
}

