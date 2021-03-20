import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PersonalMoneyService {
  transactionListJsonString:string;
  personalCash:number = 0;


  constructor(
    public toastController: ToastController,
  ) { }

  async presentToast(message:string, duration:number, color:string, position:any) {
    const toast = await this.toastController.create({
      header: message,
      duration: duration,
      color: color,
      position: position,
    });
    toast.present();
  }

  getTransactions(){
    let allTransactions = localStorage.getItem('transactionList');

    if (allTransactions == '') {
      return null;
    }
    if (allTransactions == null) {
      // initialize the localstorage
      localStorage.setItem('transactionList', '[]');

      return null;
    }

    let jsonObjTransactionList = JSON.parse(localStorage.getItem('transactionList'));

    return jsonObjTransactionList;

  }

  resetTransactions(){
    localStorage.setItem('transactionList', '[]');
  }

  addTransaction(transactionName:string, costing:number){

    // validate if personal cash value is greater than the costing
    let personalCashValue = this.getPersonalCashValue();
    if (costing > personalCashValue) {
      this.presentToast('Invalid amount', 3000, 'danger', "top");
      return;
    }

    let transactionResult = personalCashValue - costing;
    localStorage.setItem('personalCashValue', transactionResult.toString());
    this.personalCash = transactionResult;

    // manipulate transactions array to be encoded
    let transactionInfo = {
      id: Date.now(),
      transaction_name: transactionName,
      costing: costing,
    };

    let transactionList = this.getTransactions();
    transactionList.push(transactionInfo);

    let jsonObj = JSON.stringify(transactionList);

    localStorage.setItem('transactionList', jsonObj);
    return;

  }

  cashIn(cashInAmount:number){
    return new Promise((resolve) => {
      // get personal cash value
      let personalCash = parseInt(localStorage.getItem('personalCashValue'));

      let cashInResult = personalCash + cashInAmount;

      localStorage.setItem('personalCashValue', cashInResult.toString());

      // update the properties
      this.personalCash = cashInResult;
      resolve(this.personalCash);
    });
  }

  getPersonalCashValue(){
    // get personal cash value
    this.personalCash = parseInt(localStorage.getItem('personalCashValue'));

    return this.personalCash;
  }

  withdraw(withdrawAmount:number){
    return new Promise(resolve => {
      // get the stored personal cash value
      let localStoragePersonalCashValue = this.getPersonalCashValue();

      // subtract the local value to the external value
      let withdrawResult = localStoragePersonalCashValue - withdrawAmount;

      // set back the remaining value
      localStorage.setItem('personalCashValue', withdrawResult.toString());

      // update the property
      this.personalCash = this.getPersonalCashValue();

      resolve(this.personalCash);
    });

  }

  resetPersonalCashValue(){
    return new Promise(resolve => {
      localStorage.setItem('personalCashValue', '0');

      this.personalCash = 0;

      resolve(this.personalCash);
    });
  }
}
