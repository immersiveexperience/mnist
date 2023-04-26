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
  // Code
}
