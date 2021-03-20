import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalMoneyService } from 'src/app/services/personal-money.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private personalMoneyService: PersonalMoneyService,
  ) { }

  ngOnInit() {
  }

  addTransaction(transactionName, costing){
    // convert the costing to an intiger
    costing = parseInt(costing);

    this.personalMoneyService.addTransaction(transactionName, costing);

    this.modalController.dismiss();
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
