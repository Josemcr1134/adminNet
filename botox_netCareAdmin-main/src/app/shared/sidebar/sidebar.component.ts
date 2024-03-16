import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public allies:boolean = false;
  public advisers:boolean = false;
  public config:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showAlliesMenu(){
    this.allies = !this.allies
  };
  showAdvisersMenu(){
    this.advisers = !this.advisers
  };
  showConfigMenu(){
    this.config = !this.config
  };
}
