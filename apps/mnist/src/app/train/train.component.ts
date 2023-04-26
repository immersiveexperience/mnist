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
    setBackend('webgl');
  }

  async loadAndTrain(trainEpochs: string) {
    this.loading$.next(true);
    this.status$.next(TrainingStatus.Loading);
    await this.loadMnist();
    this.status$.next(TrainingStatus.Model);
    const model = createModel();
    model.summary();
    this.status$.next(TrainingStatus.Training);
    await this.trainModel(model, parseInt(trainEpochs, 10), () => {
      this.showPredictions(model);
    });
    await model.save('downloads://model');
    this.loading$.next(false);
  }

  private async loadMnist() {
    this.data = new MnistData();
    await this.data.load();
  }

  private async trainModel(
    model: Sequential,
    trainEpochs: number,
    onIteration: () => void
  ) {
    if (!this.data) {
      throw new Error('No data');
    }
    const optimizer = 'rmsprop';
    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    const trainData = this.data.getTrainData();
    const testData = this.data.getTestData();
    const batchSize = 160;
    const validationSplit = 0.15;
    const totalNumBatches =
      Math.ceil((trainData.xs.shape[0] * (1 - validationSplit)) / batchSize) *
      trainEpochs;
    let trainBatchCount = 0;
    let valAcc = 0;

    await model.fit(trainData.xs, trainData.labels, {
      batchSize,
      validationSplit,
      epochs: trainEpochs,
      callbacks: {
        onBatchEnd: async (batch, logs?: Logs) => {
          if (!logs) {
            throw new Error('No logs');
          }
          trainBatchCount++;
          this.log$.next(
            `Training... (` +
              `${((trainBatchCount / totalNumBatches) * 100).toFixed(1)}%` +
              ` complete). To stop training, refresh or close page.`
          );

          if (onIteration && batch % 10 === 0) {
            onIteration();
            this.loss$.next({
              count: trainBatchCount,
              type: 'loss',
              value: logs['loss'],
              set: 'train',
            });
            this.accuracy$.next({
              count: trainBatchCount,
              type: 'accuracy',
              value: logs['acc'],
              set: 'train',
            });
          }
          await nextFrame();
        },
        onEpochEnd: async (epoch, logs?: Logs) => {
          if (!logs) {
            throw new Error('No logs');
          }
          valAcc = logs['val_acc'];
          this.loss$.next({
            count: trainBatchCount,
            type: 'loss',
            value: logs['val_loss'],
            set: 'validation',
          });
          this.accuracy$.next({
            count: trainBatchCount,
            type: 'accuracy',
            value: logs['val_acc'],
            set: 'validation',
          });
          if (onIteration) {
            onIteration();
          }
          await nextFrame();
        },
      },
    });

    const testResult = model.evaluate(testData.xs, testData.labels) as Scalar[];
    const testAccPercent = testResult[1].dataSync()[0] * 100;
    const finalValAccPercent = valAcc * 100;
    this.log$.next(
      `Final validation accuracy: ${finalValAccPercent.toFixed(1)}%; ` +
        `Final test accuracy: ${testAccPercent.toFixed(1)}%`
    );
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
