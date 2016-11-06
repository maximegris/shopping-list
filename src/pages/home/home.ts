import { Component } from '@angular/core'
import { ToastController, ModalController, NavController, AlertController } from 'ionic-angular'
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Subject } from 'rxjs'
import { ItemModel } from '../../models/_index'
import { EditItemPage } from '../_index'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items:FirebaseListObservable<ItemModel[]>
  record: ItemModel
  shoppingMode:boolean
  shoppingModeBtn:String
  supprMode:boolean
  supprModeBtn:String
  supprItems:ItemModel[]

  constructor(public af: AngularFire, public toastCtrl: ToastController, public modalCtrl: ModalController, private navCtrl: NavController, public alertCtrl: AlertController) {
    this.items = af.database.list('/items', {
      query: {
        orderByChild: 'validate',
      }
    })
    this.record = new ItemModel()
    this.shoppingMode = false
    this.shoppingModeBtn = 'Démarrer'
    this.supprMode = false
    this.supprModeBtn = 'Supprimer'
    this.supprItems = []
  }

  add  = () => {
    let modal = this.modalCtrl.create(EditItemPage, { item: new ItemModel()})

    modal.onDidDismiss(data => {
      if(data) {
        this.items.push(data)
          .then(_ =>  {
            this.displayToast('Ingrédient ajouté')
          })
          .catch(this.errorCatched)
      }
    })

    modal.present()
  }

  reset  = () => {
	  var confirm = this.alertCtrl.create({
			title : 'Confirmation...',
			message : 'Souhaitez-vous supprimer la liste ?',
			buttons: [
				{text: 'Non', role:'cancel', handler : () => {}},
				{text: 'Oui', handler : () => {
					confirm.dismiss().then(() => {
            this.items.remove()
              .then(_ =>  {
                this.displayToast('Liste supprimée')
              })
              .catch(this.errorCatched)
					})
				}}
			]})
      confirm.present()
  }

  edit = (key:string, item:ItemModel) => {
    let modal = this.modalCtrl.create(EditItemPage, { item })

    modal.onDidDismiss(data => {
      if(data) {
        this.items.update(key, {ingredient: data.ingredient, quantity: data.quantity || 1 })
          .then(_ => {this.displayToast('Ingrédient mis à jour')
          })
          .catch(this.errorCatched)
      }
    })

    modal.present()
  }

  validate = (key:string , validate: boolean) => {
    this.items.update(key, { validate })
      .then(_ => {
        this.displayToast('Validation mise à jour')
      })
      .catch(this.errorCatched)
  }

  remove = (key:string) => {
    this.items.remove(key)
      .then(_ => {
        this.displayToast('Ingrédient supprimé')
      })
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

  toogleShoppingMode = () => {
    if(this.shoppingMode) {
      this.askEndShoppingList()
    } else {
      this.shoppingMode = true
      this.shoppingModeBtn = 'Terminer'
    }

    this.supprMode = false
    this.supprItems = []
    this.supprModeBtn = 'Supprimer'
  }

  askEndShoppingList = () => {
    this.shoppingMode = false
    this.shoppingModeBtn = 'Démarrer'
  }

  toogleSupprMode = () => {
    console.log('suppr mode')
    this.shoppingMode = false
    this.shoppingModeBtn = 'Démarrer'

    this.supprMode = !this.supprMode
    this.supprItems = []
    if(this.supprMode) {
      this.supprModeBtn = 'Valider'
    } else {
      this.supprModeBtn = 'Supprimer'
    }
  }

  resetModes = () => {
    this.shoppingMode = false
    this.shoppingModeBtn = 'Démarrer'

    this.supprMode = false
    this.supprItems = []
    this.supprModeBtn = 'Supprimer'
  }

  errorCatched = (err) => {
    console.log(err, 'You do not have access!')
  }

}
