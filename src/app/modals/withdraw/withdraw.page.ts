import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PersonalMoneyService } from 'src/app/services/personal-money.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private personalMoneyService: PersonalMoneyService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
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

  withdrawCash(withdrawAmount){
    withdrawAmount = parseInt(withdrawAmount);

    this.personalMoneyService.withdraw(withdrawAmount);

    this.presentToast('Withdraw successful', 4000, 'success', "top");

    this.modalController.dismiss();
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
