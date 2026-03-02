import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-message-dialog-box',
  standalone: true,
    imports: [CommonModule, ToastModule, RadioButtonModule, CheckboxModule, ProgressSpinnerModule, FormsModule, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MessageService],
  templateUrl: './message-dialog-box.component.html',
  styleUrl: './message-dialog-box.component.css'
})
export class MessageDialogBoxComponent {
  ingredient: any;
  message:any;
  filterVal: any;
  selectedSort: any;
  invoiceStatus:boolean = false;
  clearingStatus:boolean = false;
  paymentStatus:boolean = false;
  paymentNA:boolean = false;
  linePercentage: string = "0%";
  public data: any;
  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' }
];
  constructor(
    public dynamicDialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef) {
      this.data = this.dynamicDialogConfig.data;
      if(this.data && this.data.data && this.data.data['filter']) {
        this.filterVal = this.data['data']['filter'];
        this.selectedSort = this.data['data']['filter']['sort'];
      }

      if(this.data.section == "timeline"){
        console.info('data', this.data.data)
        if(this.data && this.data.data && this.data.data['invoiceNumber']){
          this.invoiceStatus = true;
        }
        if(this.data && this.data.data && this.data.data['paymentStatusText'] == 'NA'){
          this.paymentNA = true;
          // this.linePercentage = "50%";
        }
        if(this.data && this.data.data && this.data.data['paymentStatusText'] == 'S' && this.data.data['paymentStatus']){
          this.paymentStatus = true;
          this.linePercentage = "50%";
        }
        if(this.data && this.data.data && this.data.data['clearingStatus']){
          this.clearingStatus = true;
          this.linePercentage = "100%";
        }
      }
    }

    selectAll(e:any, key:any){

      // console.info(e, this.data['vendor'])
      if(e.checked == true){
        if(!this.filterVal[key])this.filterVal[key] = {};
        this.data['data'][key].forEach((ele:any) => {
          this.filterVal[key][ele] = true;
        });
      } else {
        this.filterVal[key] = {};
        this.data['data']['filter'][key] = {};
      }
    }

    onClickUpload(value:any): void {
      this.dialogRef.close(value);
    }

  cancel(){
    this.dialogRef.close();
  }

  onApplyFilter(filter:any){
    if(this.selectedSort)
    this.filterVal['sort'] = this.selectedSort;
    console.info('filter', filter, this.filterVal, this.selectedSort);

    this.dialogRef.close('apply');
  }

  onClearFilter(){
    this.filterVal = {};
    this.data['data']['filter'] = {};
    this.selectedSort = undefined;
    this.dialogRef.close('clear');
  }

  slectVal(value:any, key:any){
    if(!this.filterVal[key]){
      this.filterVal[key] = {}
      this.filterVal[key][value] = true;
      // if(this.data['data'][key].length == Object.keys(this.filterVal[key]).length) this.filterVal[key+'All'] = true;
    } else if(!this.filterVal[key][value])
      this.filterVal[key][value] = true;
      // if(this.data['data'][key].length == Object.keys(this.filterVal[key]).length) this.filterVal[key+'All'] = true;
    else{
      delete this.filterVal[key][value]
      this.filterVal[key+'All'] = false
    }
  }

  backToHome(){
    this.dialogRef.close("done");
  }

}
