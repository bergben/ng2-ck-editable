# ng2-ck-editable
Angular 2 directive to make any div editable using a CKEditor. The main idea is to make key-value pairs editable.

## Install
```bash
$ npm install ng2-ck-editable --save
```

### Import the module
```TypeScript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2CKEditableModule } from 'ng2-ck-editable'; // <-- import the module
import { MyComponent } from './my.component';

@NgModule({
    imports: [BrowserModule,
              Ng2CKEditableModule.forRoot() // <-- include it in your app module
             ],
    declarations: [MyComponent],  
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

## Usage
### Use it in your template
```html
<div [ck-editable]="{key:'myPerfectKey'}">Some content</div>
```
or
```html
<div [ck-editable]="{key:'myPerfectKey', value:'some content'}"></div>
```
### Output events
```html
    <div [ck-editable]="{key:'myPerfectKey'}" (ck-editable)="onSave($event)">
```
Can be used to save the changed data. The event contains an Object "current" which is the current key value pair, aswell as a "previous" which contains the key value pair before the data was changed (in case of an error to reset the data). 

### Default behaviour
By default the value that is provided in the directive is prioritized: 
```html
<div [ck-editable]="{key:'myPerfectKey', value:'some value 1'}">Some content</div>
```
Here for example the value in the CKEditor would then be "some value 1". 

## Options
### i18n - Default wording global
By default the component buttons are in English: "Save", "Edit" and "Cancel". You can set those defaults in the forRoot when importing the Module in your app.module.ts like so: 
```TypeScript
    Ng2CKEditableModule.forRoot(
      {
        editText:"Bearbeiten",
        cancelText:"Abbrechen",
        saveText:"Speichern"
      }
    ),
```

### i18n - Default wording per element
You can overwrite the default wording for the buttons: 
```html
    <div [ck-editable]="{key:'myPerfectKey'}" [ck-editable-cancel-text]="'custom text'" [ck-editable-save-text]="'save text'" [ck-editable-edit-text]="'custom edit'">
```

### Button styling
The buttons each have a class 'ck-editable-save', 'ck-editable-cancel' and 'ck-editable-edit' which you can use to apply styling to the buttons.

## To-do
 - Provide a demo
