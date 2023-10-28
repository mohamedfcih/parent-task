import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, scan, takeWhile, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private showAfterRedirect = false;
    public timer$ = timer(0, 1000).pipe(
      scan(acc => --acc, 3),
      takeWhile(x => x >= 0)
    );

    constructor(private router: Router) {
        // clear alert messages on route change unless 'showAfterRedirect' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.showAfterRedirect) {
                    // only keep for a single route change
                    this.showAfterRedirect = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    onAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, showAfterRedirect = false) {
        this.showAfterRedirect = showAfterRedirect;
        this.subject.next({ type: 'success', message });
        this.timer();
    }

    error(message: string, showAfterRedirect = false) {
        this.showAfterRedirect = showAfterRedirect;
        this.subject.next({ type: 'error', message });
        this.timer();
    }
    timer() {
      return this.timer$.subscribe(time => {
        if (time === 0) {
          this.clear();
        }
      });
    }

    clear() {
        // clear by calling subject.next() with null
        this.subject.next(null);
    }
}
