import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  title!: string;
  id!: string;
  loading = false;
  selectedUser!: User;

  constructor(private accountService: AccountService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.loading = true;
      this.accountService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          debugger
          this.selectedUser = x;
          this.title = `${x.first_name} ${x.last_name}`;
          this.loading = false;
        });
    }
  }
}
