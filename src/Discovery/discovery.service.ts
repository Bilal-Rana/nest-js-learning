import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

@Injectable()
export class MyDiscoveryService {
  constructor(private readonly discoveryService: DiscoveryService) {}

  listProviders(): string[] {
    const providers = this.discoveryService.getProviders();
    return providers
      .filter(wrapper => wrapper.instance)
      .map(wrapper => wrapper.instance.constructor.name);
  }
}
