import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { first, map, take } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { ClickStopPropagation } from '@app/_helpers/event-handler.directive';
import { ModalService } from '@app/_services/modal.service';

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, ClickStopPropagation],
})
export class ListComponent implements OnInit {
  confirmedResult: boolean | undefined;
  users?: any[];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }
  showDetails(id: string) {
    this.router.navigate(['users/details/' + id]);
  }

  deleteUser(id: string) {
    debugger;
    const user = this.users!.find((x) => x.id === id);
    user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users!.filter((x) => x.id !== id);

          this.alertService.success('User Deleted Successfully', true);

      });
  }

  openConfirm(id: string) {
    this.modalService
      .confirm('Are you sure?')
      .pipe(
        take(1) // take() manages unsubscription for us
      )
      .subscribe((result) => {
        if (result) {
          debugger;
          this.deleteUser(id);
        }
      });
  }
}
