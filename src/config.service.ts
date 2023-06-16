import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get(key);
  }
}
