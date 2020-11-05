import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.register(this);
  }

  ngOnDestroy(): void {
    this.loaderService.unregister();
  }

}
