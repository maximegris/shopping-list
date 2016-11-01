import { Component } from '@angular/core'
import { NavParams, ViewController } from 'ionic-angular'
import { ItemModel } from '../../../models/_index'

@Component({
  selector: 'edit-item',
	templateUrl: 'edit-item.html'
})
export class EditItemPage {
  record:ItemModel

	constructor(public params: NavParams, public viewCtrl: ViewController) {
    this.record = params.get('item')
	}

  save() {
    this.viewCtrl.dismiss(this.record)
  }

  cancel() {
    this.viewCtrl.dismiss()
  }

}
