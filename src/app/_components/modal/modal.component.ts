import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './modal.component.html',
  styleUrls:['./modal.component.scss'],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  title!: string;
  prompt!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
