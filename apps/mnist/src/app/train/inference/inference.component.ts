import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tensor1D, Tensor2D, Tensor4D } from '@tensorflow/tfjs';
import { Inference } from './inference.interface';

@Component({
  selector: 'mhpai-inference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inference.component.html',
  styleUrls: ['./inference.component.scss'],
})
export class InferenceComponent {
  @ViewChild('inferenceContainer') inferenceContainer:
    | ElementRef<HTMLDivElement>
    | undefined;

  @Input() set inference(inference: Inference | undefined | null) {
    if (inference) {
      this.showResults(
        inference.batch,
        inference.predictions,
        inference.labels
      );
    }
  }

  private showResults(
    batch: { xs: Tensor4D; labels: Tensor2D },
    predictions: number[],
    labels: number[]
  ) {
    if (!this.inferenceContainer) {
      throw new Error('inferenceImage not found');
    }
    this.inferenceContainer.nativeElement.innerHTML = '';
    const testExamples = batch.xs.shape[0];
    for (let i = 0; i < testExamples; i++) {
      const image = batch.xs.slice([i, 0], [1, batch.xs.shape[1]]);
      const div = document.createElement('div');
      const canvas = document.createElement('canvas');
      canvas.className = 'bg-gray-900';
      this.draw(image.flatten(), canvas);
      const pred = document.createElement('div');
      const prediction = predictions[i];
      const label = labels[i];
      const correct = prediction === label;
      div.className = `flex flex-col w-16 h-16 items-center test-xs justify-center ${
        correct ? ' bg-green-500' : 'bg-red-500'
      }`;
      pred.className = `text-xs text-white mb-0.5`;
      pred.innerText = `pred: ${prediction}`;

      div.appendChild(pred);
      div.appendChild(canvas);

      this.inferenceContainer.nativeElement.appendChild(div);
    }
  }

  private draw(image: Tensor1D, canvas: HTMLCanvasElement) {
    const [width, height] = [28, 28];
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = new ImageData(width, height);
    const data = image.dataSync();
    for (let i = 0; i < height * width; ++i) {
      const j = i * 4;
      imageData.data[j + 0] = data[i] * 255;
      imageData.data[j + 1] = data[i] * 255;
      imageData.data[j + 2] = data[i] * 255;
      imageData.data[j + 3] = 255;
    }
    ctx?.putImageData(imageData, 0, 0);
  }
}
