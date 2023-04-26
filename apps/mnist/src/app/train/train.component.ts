import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Logs,
  Rank,
  Scalar,
  Sequential,
  Tensor,
  nextFrame,
  setBackend,
  tidy,
} from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { MnistData } from './mnist';
import { BehaviorSubject } from 'rxjs';
import { createModel } from './model';
import { TextOutputComponent } from './text-output/text-output.component';
import { Inference } from './inference/inference.interface';
import { InferenceComponent } from './inference/inference.component';
import { LossAccuracy } from './loss-accuracy/loss-accuracy.interface';
import { LossAccuracyComponent } from './loss-accuracy/loss-accuracy.component';

enum TrainingStatus {
  Loading = 'Loading MNIST data...',
  Model = 'Creating model...',
  Training = 'Training model...',
}

@Component({
  selector: 'mhpai-train',
  standalone: true,
  imports: [
    CommonModule,
    TextOutputComponent,
    InferenceComponent,
    LossAccuracyComponent,
  ],
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
})
export class TrainComponent {
  loss$ = new BehaviorSubject<LossAccuracy | null>(null);
  accuracy$ = new BehaviorSubject<LossAccuracy | null>(null);
  log$ = new BehaviorSubject('');
  loading$ = new BehaviorSubject(false);
  status$ = new BehaviorSubject(TrainingStatus.Loading);
  testResults$ = new BehaviorSubject<Inference | null>(null);
  data: MnistData | undefined;

  constructor() {
    // Code
  }

  async loadAndTrain(trainEpochs: string) {
    // Code
  }

  private async loadMnist() {
    // Code
  }

  private async trainModel(
    model: Sequential,
    trainEpochs: number,
    onIteration: () => void
  ) {
    // Code
  }

  private async showPredictions(model: Sequential) {
    if (!this.data) {
      throw new Error('No data');
    }
    const testExamples = 100;
    const examples = this.data.getTestData(testExamples);

    tidy(() => {
      const output = model.predict(examples.xs) as Tensor<Rank>;
      const axis = 1;
      const labels = Array.from(examples.labels.argMax(axis).dataSync());
      const predictions = Array.from(output.argMax(axis).dataSync());
      this.testResults$.next({ batch: examples, predictions, labels });
    });
  }
}
