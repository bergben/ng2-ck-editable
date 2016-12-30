import { Component, ElementRef, Input, Output, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ViewChild, EventEmitter } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { CKEditableData, CKEditableOptions } from './ng2-ck-editable.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: '[ck-editable]',
  template: `
    <div #CKEditableNgContent [hidden]="true">
      <ng-content></ng-content>
    </div>
    <div class="ck-editable-buttons-bar" *ngIf="editing">
        <button class="btn btn-primary ck-editable-save" (click)="save()">{{saveText}}</button>
        <button class="btn btn-primary ck-editable-cancel" (click)="cancel()">{{cancelText}}</button>
    </div>
    <div class="ck-editable-content">
      <button class="btn btn-primary ck-editable-edit" [hidden]="editing || data.value!==''" (click)="showCKEditor()">{{editText}}</button>
      <div [innerHTML]="data.value" [hidden]="editing" (click)="showCKEditor()"></div>
      <div #CKEditableContentTemplate></div>
    </div>
    `,
})
export class Ng2CKEditableComponent implements OnInit {
  @Input('ck-editable') data: CKEditableData;
  @Input('save-text') saveText: string;
  @Input('cancel-text') cancelText: string;
  @Input('edit-text') editText: string;
  @Input('config') config: any;

  @Output('ck-editable') output: EventEmitter<any> = new EventEmitter();

  @ViewChild('CKEditableContentTemplate', { read: ViewContainerRef }) CKEditableContent: ViewContainerRef;
  @ViewChild('CKEditableNgContent', { read: ViewContainerRef }) CKEditableNgContent: ViewContainerRef;
  originalData: CKEditableData;
  CKEditableContentElement: any;
  CKEditorCmp: ComponentRef<any>;
  editing: Boolean = false;
  constructor(private el: ElementRef, private cfr: ComponentFactoryResolver, private defaultOptions: CKEditableOptions) {
  }
  ngOnInit() {
    if (typeof (this.data.value) !== "string") {
      this.data.value = this.CKEditableNgContent.element.nativeElement.innerHTML;
    }
    if (this.saveText === "" || this.saveText === undefined) {
      this.saveText = this.defaultOptions.saveText;
    }
    if (this.editText === "" || this.editText === undefined) {
      this.editText = this.defaultOptions.editText;
    }
    if (this.cancelText === "" || this.cancelText === undefined) {
      this.cancelText = this.defaultOptions.cancelText;
    }
    if (typeof this.config ===  'undefined') {
      this.config = this.defaultOptions.config;
    }
    this.CKEditableContentElement = this.CKEditableContent.element.nativeElement;
    this.CKEditableContentElement.style.cursor = "text";
  }
  showCKEditor(): void {
    this.originalData = Object.assign({}, this.data);
    this.editing = true;
    let CKEditorFactory = this.cfr.resolveComponentFactory(CKEditorComponent);
    this.CKEditorCmp = this.CKEditableContent.createComponent(CKEditorFactory);
    this.CKEditorCmp.instance.value = this.data.value;
    this.CKEditorCmp.instance.config=this.config;
  }
  cancel(): void {
    this.editing = false;
    this.data = this.originalData;
    this.CKEditableContent.clear();
  }
  save(): void {
    this.editing = false;
    this.data.value = this.CKEditorCmp.instance.value;
    this.output.emit({ "current": this.data, "previous": this.originalData });
    this.CKEditableContent.clear();
  }
}