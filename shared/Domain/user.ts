export interface User {
  lineId: string;
  name: string;
  threeRecord: {
    rate: number;
    rankHistory: number[];
    gameCount: number;
    rankAverage: number;
    percentageFirst: number;
    percentageSecound: number;
    percentageMinus: number;
  };
  fourRecord: {
    rate: number;
    rankHistory: number[];
    gameCount: number;
    rankAverage: number;
    percentageFirst: number;
    percentageSecound: number;
    percentageFourth: number;
    percentageMinus: number;
  };
}
