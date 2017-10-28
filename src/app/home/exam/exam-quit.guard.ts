import { CanDeactivate, Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class ExamQuitGuard implements CanDeactivate<boolean> {

  // constructor(
  //   private router: Router,
  // ) {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       console.log(event)
  //     }
  //   });
  // }

  canDeactivate(): boolean {
    return confirm('确认离开吗');
  }
}