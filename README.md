# Shopping-List

A colaborative shopping list (based on firebase)

## Prerequisites

* A Firebase project (https://firebase.google.com/)

* A code push account (https://microsoft.github.io/code-push/)

## Files to change

* config.xml => Add Code Push API KEY 

* src/app/app.module.ts => Firebase project info (Api Key & Url)

``` javascript
export const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    storageBucket: '',
    messagingSenderId: ''
} 
```

## Firebase workaround

After doing npm install, go to node_module/angularfire2 and add at the begining of `angularfire2.d.ts`

import * as firebase from 'firebase'; in node_modules/angularfire2/angularfire2.d.ts

## Command lines

* Launch application in browser => `ionic serve`

* Run application => `ionic run android`

* Build application => ``ionic build android`

## CodePush deployement

* code-push release-cordova `appName` `platform`
