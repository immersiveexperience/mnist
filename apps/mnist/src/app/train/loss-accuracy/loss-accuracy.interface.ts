export interface LossAccuracy {
  count: number;
  type: 'loss' | 'accuracy';
  value: number;
  set: 'validation' | 'train';
}
