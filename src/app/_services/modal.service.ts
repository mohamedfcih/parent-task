import { Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfirmDialogComponent } from '@app/_components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  confirm(
    prompt = 'Really?',
    title = 'Confirm'
  ): Observable<boolean|undefined> {
    return this.openDialog<ConfirmDialogComponent, boolean>(
      ConfirmDialogComponent,
      { title, prompt }
    );
  }

  openDialog<T, R>(
    content: Type<T>,
    config?: Partial<T>,
    options?: NgbModalOptions
  ): Observable<R | undefined> {
    // we use a static backdrop by default,
    // but allow the user to set anything in the options
    const modal = this.ngbModal.open(content, {
      backdrop: 'static',
      ...options,
    });

    // copy the config values (if any) into the component
    Object.assign(modal.componentInstance, config);

    return from(modal.result).pipe(
      catchError((error) => {
        console.warn(error);
        return of(undefined);
      })
    );
  }
}
