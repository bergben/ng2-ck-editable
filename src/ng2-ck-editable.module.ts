import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2CKEditableComponent } from './ng2-ck-editable.component';
import { CKEditableOptions, CKEditableOptionsInterface } from './ng2-ck-editable.interface';
import { CKEditorModule, CKEditorComponent } from 'ng2-ckeditor';

export const USER_OPTIONS: OpaqueToken = new OpaqueToken('ck editable custom user options');

export function optionsFactory(userOptions: CKEditableOptions): CKEditableOptions {
  const options: CKEditableOptions = new CKEditableOptions();
  Object.assign(options, userOptions);
  return options;
}

@NgModule({
  imports: [
    CKEditorModule,
    CommonModule
  ],
  entryComponents: [
    CKEditorComponent
  ],
  declarations: [Ng2CKEditableComponent],
  exports: [Ng2CKEditableComponent]
})
export class Ng2CKEditableModule {
  static forRoot(options: CKEditableOptionsInterface = {}): ModuleWithProviders {

    return {
      ngModule: Ng2CKEditableModule,
      providers: [{
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: CKEditableOptions,
        useFactory: optionsFactory,
        deps: [USER_OPTIONS]
      }]
    };

  }
}