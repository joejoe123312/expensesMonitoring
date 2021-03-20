import { TestBed } from '@angular/core/testing';

import { PersonalMoneyService } from './personal-money.service';

describe('PersonalMoneyService', () => {
  let service: PersonalMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
