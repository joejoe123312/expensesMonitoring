import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalMoneyService } from 'src/app/services/personal-money.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.page.html',
  styleUrls: ['./cash-in.page.scss'],
})
export class CashInPage implements OnInit {

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

  cashIn(cashInAmount){
    cashInAmount = parseInt(cashInAmount);

    this.personalMoneyService.cashIn(cashInAmount).then((resolveValue) => {
      this.presentToast('Cash in successfully', 4000, 'success', "top");
    });

    this.closeModal();
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
