import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LayersModel,
  Rank,
  Tensor,
  browser,
  loadLayersModel,
  scalar,
  tidy,
} from '@tensorflow/tfjs';
import { DrawareaDirective } from './draw.directive';

@Component({
  selector: 'mhpai-predict',
  standalone: true,
  imports: [CommonModule, DrawareaDirective],
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent implements OnInit {
  predictedValue: number | undefined;

  private model: LayersModel | undefined;

  @ViewChild(DrawareaDirective) drawArea: DrawareaDirective | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  clear() {
    this.predictedValue = undefined;
    this.drawArea?.clear();
  }

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    this.model = await loadLayersModel('/assets/models/model.json');
  }

  async predict(imageData: ImageData) {
    await tidy(() => {
      const img = browser.fromPixels(imageData, 1).toFloat();
      const normalized = img.div(scalar(256.0));
      const batched = normalized.reshape([1, 28, 28, 1]);

      const output = this.model?.predict(batched) as Tensor<Rank> | undefined;

      output?.data().then((predictions) => {
        this.predictedValue = predictions.indexOf(Math.max(...predictions));
        this.changeDetectorRef.markForCheck();
      });
    });
  }
}
