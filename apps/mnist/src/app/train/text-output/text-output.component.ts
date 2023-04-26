import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mhpai-text-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-output.component.html',
  styleUrls: ['./text-output.component.scss'],
})
export class TextOutputComponent {
  @Input() heading: string | undefined;
  @Input() text: string | null | undefined;
}
