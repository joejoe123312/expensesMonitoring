import { Component, OnInit } from '@angular/core';
import { PersonalMoneyService } from '../services/personal-money.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.page.html',
  styleUrls: ['./expenses-list.page.scss'],
})
export class ExpensesListPage implements OnInit {

  personalTransactions:any;

  constructor(
    private personalMoneyService: PersonalMoneyService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.personalTransactions = this.personalMoneyService.getTransactions();

  }

}
