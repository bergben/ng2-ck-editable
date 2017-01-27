import { SafeHtml } from '@angular/platform-browser';
export interface CKEditableData{
    key:string;
    value?: string;
    renderHtml?: SafeHtml;
    [propName: string]: any;
}
export interface CKEditableOptionsInterface{
    editText?:string;
    cancelText?:string;
    saveText?:string;
    config?:any;
}
export class CKEditableOptions implements CKEditableOptionsInterface {
  editText: string ="Edit";
  cancelText: string="Cancel";
  saveText: string="Save";
  config: any={};
}