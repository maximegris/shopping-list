import { NgModule } from '@angular/core'
import { IonicApp, IonicModule } from 'ionic-angular'
import { MyApp } from './app.component'
import { HomePage, EditItemPage } from '../pages/_index'
import { AngularFireModule } from 'angularfire2'

export const firebaseConfig = {
    apiKey: '<KEY>',
    authDomain: 'shopping-list-fe281.firebaseapp.com',
    databaseURL: 'https://shopping-list-fe281.firebaseio.com',
    storageBucket: 'shopping-list-fe281.appspot.com',
    messagingSenderId: '<KEY>'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditItemPage
  ],
  providers: []
})
export class AppModule {}
