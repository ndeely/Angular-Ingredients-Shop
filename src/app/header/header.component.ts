import {Component, OnDestroy, OnInit} from "@angular/core";

import {DataStorageService} from "@shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private userSub: Subscription;

  constructor(
    private dss: DataStorageService,
    private as: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.as.user.subscribe(
      user => {
        this.isAuth = !!user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dss.storeRecipes();
  }

  onFetchData() {
    this.dss.fetchRecipes().subscribe();
  }
}
