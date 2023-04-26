import { Tensor2D, Tensor4D } from '@tensorflow/tfjs';

export interface Inference {
  batch: { xs: Tensor4D; labels: Tensor2D };
  predictions: number[];
  labels: number[];
}
