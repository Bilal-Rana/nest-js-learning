import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';



@Injectable()
export class HashService {
  private readonly saltRounds = 10;
  // Higher saltRounds = more secure but slower
  // 10 is the recommended default for most apps

  // ── Hash a password ──
  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
    // Each call produces a DIFFERENT hash even for same password
    // because bcrypt auto-generates a unique salt internally
  }

  // ── Hash with a custom salt ──
  async hashWithCustomSalt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12); // generate salt with 12 rounds
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  // ── Verify a password against a hash ──
  async comparePassword(plainPassword: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hash);
    return isMatch;
    // bcrypt extracts the salt from the hash automatically — no need to save it separately
  }

  // ── Check hash info (rounds used, etc.) ──
  getHashRounds(hash: string): number {
    return bcrypt.getRounds(hash); // returns the salt rounds used
  }
}