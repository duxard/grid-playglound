import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { CARS } from '../../mocks/data.mock';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss']
})
export class BasicGridComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  private gridReady = false;

  columnDefs: ColDef[] = [
    { headerName: 'Car', field: 'car', filter: true },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Color', field: 'color' }
  ];

  rowData = CARS;

  rowStyle = { };

  gridOptions: GridOptions = {
    headerHeight: 25,
    rowHeight: 40,

    // applied for all columns
    defaultColDef: {
      resizable: true,
      sortable: true
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  // @ts-ignore
  onGridReady({api: gridApi}) {
    this.gridApi = gridApi;
    this.gridReady = true;
    // @ts-ignore
    this.gridOptions.api.sizeColumnsToFit();
  }

}
