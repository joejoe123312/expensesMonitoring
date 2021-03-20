import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddTransactionPage } from '../modals/add-transaction/add-transaction.page';
import { CashInPage } from '../modals/cash-in/cash-in.page';
import { WithdrawPage } from '../modals/withdraw/withdraw.page';
import { ToastController } from '@ionic/angular';
import { PersonalMoneyService } from '../services/personal-money.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  personalCash:number;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
    private personalMoneyService: PersonalMoneyService,
  ) {}

  ionViewWillEnter(){
    console.log(this.personalCash);
    let personalCashValue = localStorage.getItem('personalCashValue');

    if (personalCashValue == null) {
      this.personalCash = 0;
    }

    // get the personal cash value and update the property
    this.personalCash = this.personalMoneyService.getPersonalCashValue();

    if (isNaN(this.personalCash)) {
      localStorage.setItem('personalCashValue', '0');
      this.personalCash = 0;
    }
  }

  async presentToast(message:string, duration:number, color:string, position:any) {
    const toast = await this.toastController.create({
      header: message,
      duration: duration,
      color: color,
      position: position,
    });
    toast.present();
  }

  updateCashOnHandValue(modal){
    modal.onDidDismiss().then(() => {
      // update the personalCash property
      this.personalCash = this.personalMoneyService.getPersonalCashValue();
    });
  }

  async cashIn(){
    const modal = await this.modalController.create({
      component: CashInPage,
      cssClass: 'cash-in-css',
      swipeToClose: true,
    });

    await modal.present();

    this.updateCashOnHandValue(modal);
  }

  async withdraw(){
    const modal = await this.modalController.create({
      component: WithdrawPage,
      cssClass: 'cash-in-css',
      swipeToClose: true,
    });

    await modal.present();

    this.updateCashOnHandValue(modal);
  }

  async addTransaction(){
    const modal = await this.modalController.create({
      component: AddTransactionPage,
      cssClass: 'add-transaction',
      swipeToClose: true,
    });

    await modal.present();

    modal.onDidDismiss().then(() => {
      // update the cash on hand
      this.personalCash = this.personalMoneyService.getPersonalCashValue();
      this.presentToast('Transaction Added successfully', 4000, 'success', "top");
    });
  }

  async resetCashOnHand(){
    const alert = await this.alertController.create({
      header: 'Reseting cash on hand value',
      message: 'Are you sure you want to reset?',
      buttons: [
        {
          text: "Yes",
          role: 'destructive',
          handler: () => {
            this.personalMoneyService.resetPersonalCashValue().then(resolveValue => {
              // update the personal cash property
              this.personalCash = 0;
            });


            // present alert
            this.presentToast('Cash on hand reset successfully', 4000, 'danger', "top");

          }
        },
        {
          text: "No",
          role: 'cancel',
        },
      ]
    });

    await alert.present();
  }

  async resetTransactions(){
    const alert = await this.alertController.create({
      header: 'Reseting Transactions',
      message: 'Are you sure you want to reset?',
      buttons: [
        {
          text: "Yes",
          role: 'destructive',
          handler: () => {
            this.personalMoneyService.resetTransactions();
            this.presentToast('Reset transactions complete', 4000, 'danger', "top");
          }
        },
        {
          text: "No",
          role: 'cancel',
        },
      ]
    });

    alert.present();
  }
}
