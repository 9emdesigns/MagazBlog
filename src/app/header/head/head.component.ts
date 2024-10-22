import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
})
export class HeadComponent implements OnInit {
  ngOnInit(): void {
    $(document).foundation();
  }
}
