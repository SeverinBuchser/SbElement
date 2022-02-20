import { TestBed } from '@angular/core/testing';

import { SbThemeService } from './theme.service';

describe('SbThemeService', () => {
  let service: SbThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
