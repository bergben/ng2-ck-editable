export interface CKEditableData{
    key:string;
    value?:string;
    [propName: string]: any;
}
export interface CKEditableOptionsInterface{
    editText?:string;
    cancelText?:string;
    saveText?:string;
}
export class CKEditableOptions implements CKEditableOptionsInterface {
  editText: string ="Edit";
  cancelText: string="Cancel";
  saveText: string="Save";
}