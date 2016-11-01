import { Component } from '@angular/core'
import { ToastController, ModalController, NavController, AlertController } from 'ionic-angular'
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { ItemModel } from '../../models/_index'
import { EditItemPage } from '../_index'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items:FirebaseListObservable<ItemModel[]>
  record: ItemModel

  constructor(public af: AngularFire, public toastCtrl: ToastController, public modalCtrl: ModalController,
    private navCtrl: NavController, public alertCtrl: AlertController) {
    this.items = af.database.list('/items')
    this.record = new ItemModel()
  }

  add  = () => {
    let modal = this.modalCtrl.create(EditItemPage, { item: new ItemModel()})

    modal.onDidDismiss(data => {
      if(data) {
        this.items.push(data)
          .then(_ => this.displayToast('Ingrédient ajouté'))
          .catch(this.errorCatched)
      }
    })

    modal.present()
  }

  reset  = () => {
	  var confirm = this.alertCtrl.create({
			title : 'Confirm',
			message : 'Souhaitez-vous supprimer la liste ?',
			buttons: [
				{text: 'Non', role:'cancel', handler : () => {}},
				{text: 'Oui', handler : () => {
					confirm.dismiss().then(() => {
            this.items.remove()
              .then(_ => this.displayToast('Liste supprimée'))
              .catch(this.errorCatched)
					})
				}}
			]})
      confirm.present()
  }

  edit = (key, item) => {
    console.log('Open modal edit', item)
    let modal = this.modalCtrl.create(EditItemPage, { item })

    modal.onDidDismiss(data => {
      if(data) {
        this.items.update(key, data)
          .then(_ => this.displayToast('Ingrédient mis à jour'))
          .catch(this.errorCatched)
      }
    })

    modal.present()
  }

  validate = (key:string , validate: boolean) => {
    this.items.update(key, { validate })
      .then(_ => this.displayToast('Validation mise à jour'))
      .catch(this.errorCatched)
  }

  remove = (key:string) => {
    this.items.remove(key)
      .then(_ => this.displayToast('Ingrédient supprimé'))
      .catch(this.errorCatched)
  }

  displayToast = (message:string) => {
    this.record = new ItemModel()
    this.toastCtrl.create({
      message: message,
      duration: 2000
    })
      .present()
  }

  errorCatched = (err) => {
    console.log(err, 'You do not have access!')
  }

}
