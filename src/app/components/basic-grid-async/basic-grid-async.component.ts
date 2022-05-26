import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { FIN_DATA } from '../../mocks/data.mock';
import { Observable, timer, map } from 'rxjs';

@Component({
  selector: 'app-basic-grid-async',
  templateUrl: './basic-grid-async.component.html',
  styleUrls: ['./basic-grid-async.component.scss']
})
export class BasicGridAsyncComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  private gridReady = false;

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Bid', field: 'bid' },
    { headerName: 'Mid', field: 'mid' },
    { headerName: 'Ask', field: 'ask' },
    { headerName: 'Volume', field: 'volume' }
  ];

  gridOptions: GridOptions = {
    headerHeight: 25,
    rowHeight: 40,
    defaultColDef: {
      resizable: true,
      sortable: true
    }
  };

  rowData: any;
  $obs!: Observable<unknown>;

  constructor() { }

  ngOnInit(): void {
    // if we don't use tick:
    // this.rowData = of(FIN_DATA);
    this.$obs = timer(1000, 300);
    this.$obs.pipe(map(() => this.updateData())).subscribe((data: any) => {
      this.gridApi.setRowData(data);
    })
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridReady = true;
    this.gridOptions.api?.sizeColumnsToFit();
  }

  private updateData(): unknown {
    const data = FIN_DATA;
    return data.map((el, id, arr) => {
      return {
        name: el.name,
        bid: rand(),
        mid: rand(),
        ask: rand(),
        volume: rand()
      }
    });
  }
}

const rand = ():number => Math.floor(1 + Math.random()*100);
