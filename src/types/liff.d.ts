import type { ExtendedInit, LiffMockApi } from '@line/liff-mock';

declare module '@line/liff' {
  interface Liff {
    init: ExtendedInit;
    $mock: LiffMockApi;
  }
}