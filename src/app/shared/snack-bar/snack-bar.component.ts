import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  @Input() errorOrSuccessText: string;
  @Input() actionText: string;
  @Input() isErrorOrsuccess: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
