import { CommonModule, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { FeesApiService } from '../fees/fees-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, TableModule,FormsModule, ToastModule, ProgressSpinnerModule, CommonModule, OverlayPanelModule],
  providers: [MessageService],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  transactions = [
    {
      studentId: 34,
      studentName: 'Test Test',
      class: 'Class 1',
      amount: 500,
      date: new Date(),
      mode: 'Cash',
      status: 'Partial'
    },
    {
      studentId: 44,
      studentName: 'testing testing',
      class: 'Class 2',
      amount: 10000,
      date: new Date(),
      mode: 'UPI',
      status: 'Pending'
    },
    {
      studentId: 38,
      studentName: 'two testing four',
      class: 'Class 1',
      amount: 5000,
      date: new Date(),
      mode: 'Card',
      status: 'Paid'
    }
  ];
  filteredTransactions: any[] = [];
  txnStudentId: any;
  txnClass: any;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  action = "view"; searchText = "";
  constructor(private feeapiservice: FeesApiService, private _location: Location,
    private route: ActivatedRoute) {
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    this.filteredTransactions = [...this.transactions];
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }
  applyTxnFilter() {
    this.filteredTransactions = this.transactions.filter(t =>
      (!this.txnStudentId ||
        t.studentId.toString().includes(this.txnStudentId)) &&
      (!this.txnClass ||
        this.txnClass === 'All' ||
        t.class === this.txnClass)
    );
  }
}
// this.transactions.push({
//       studentId: inv.studentId,
//       studentName: inv.studentName,
//       class: inv.class,
//       amount: inv.amount,
//       date: new Date(),
//       mode: 'Cash',
//       status: inv.savedStatus
//     });