import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';
import { Item } from  './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'angular-pwa';
  items:  Array<Item>;
  update: boolean = false;
  chuckNorris: any;

  constructor(updates: SwUpdate, private dataService: DataService) {
    updates.available.subscribe(event => {
      this.update = true;
      updates.activateUpdate().then(() => document.location.reload());
    })
  }

  ngOnInit() {
    this.dataService.gimmeChuckNorris().subscribe(res => {
      this.chuckNorris = res;
    })

    this.fetchData();
  }

  fetchData() {
    this.dataService.fetchData().subscribe((data:  Array<Item>) => {
      console.log(data);
      this.items  =  data;
    }, (err)=>{
      console.log(err);
    });
  }
}
