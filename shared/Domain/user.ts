export interface ThreeRecord {
  rate: number;
  rankHistory: number[];
  gameCount: number;
  rankCount: number;
  firstCount: number;
  secondCount: number;
  thirdCount: number;
  minusCount: number;
}

export interface FourRecord {
  rate: number;
  rankHistory: number[];
  gameCount: number;
  rankCount: number;
  firstCount: number;
  secondCount: number;
  thirdCount: number;
  fourthCount: number;
  minusCount: number;
}

export interface User {
  lineId: string;
  name: string;
  threeRecord: ThreeRecord;
  fourRecord: FourRecord;
}
