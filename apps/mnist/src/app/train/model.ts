import { Sequential, layers, sequential } from '@tensorflow/tfjs';
import { IMAGE_H, IMAGE_W } from './mnist';

export function createModel(): Sequential {
  const model = sequential();
  model.add(
    layers.conv2d({
      inputShape: [IMAGE_H, IMAGE_W, 1],
      kernelSize: 5,
      filters: 32,
      padding: 'same',
      activation: 'relu',
    })
  );
  model.add(layers.maxPooling2d({ poolSize: 2, strides: 2 }));
  model.add(
    layers.conv2d({
      kernelSize: 5,
      filters: 64,
      padding: 'same',
      activation: 'relu',
    })
  );
  model.add(layers.maxPooling2d({ poolSize: 2, strides: 2 }));
  model.add(layers.flatten({}));
  model.add(layers.dense({ units: 1024, activation: 'relu' }));
  model.add(layers.dropout({ rate: 0.2 }));
  model.add(layers.dense({ units: 10, activation: 'softmax' }));
  return model;
}
