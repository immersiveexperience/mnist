import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LossAccuracy } from './loss-accuracy.interface';
import { render } from '@tensorflow/tfjs-vis';

@Component({
  selector: 'mhpai-loss-accuracy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loss-accuracy.component.html',
  styleUrls: ['./loss-accuracy.component.scss'],
})
export class LossAccuracyComponent {
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;
  values: [{ x: number; y: number }[], { x: number; y: number }[]] = [[], []];

  @Input() heading: string | undefined;
  @Input() set data(data: LossAccuracy | null | undefined) {
    if (data) {
      this.plot(data);
    }
  }

  plot(data: LossAccuracy) {
    if (!this.container?.nativeElement) {
      throw new Error('Container not found');
    }
    const series = data.set === 'train' ? 0 : 1;
    const fill = data.set === 'train' ? 1 : 0;
    this.values[series].push({ x: data.count, y: data.value });
    this.values[fill].push({ x: data.count, y: 0 });
    render.linechart(
      this.container.nativeElement,
      {
        values: this.values,
        series: ['train', 'validation'],
      },
      {
        xLabel: 'Batch #',
        yLabel: data.type === 'accuracy' ? 'Accuracy' : 'Loss',
        width: 600,
        height: 300,
      }
    );
  }
}
