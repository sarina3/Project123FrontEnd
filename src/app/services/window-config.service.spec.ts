import { TestBed } from '@angular/core/testing';

import { WindowConfigService } from './window-config.service';

describe('WindowConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowConfigService = TestBed.get(WindowConfigService);
    expect(service).toBeTruthy();
  });
});
