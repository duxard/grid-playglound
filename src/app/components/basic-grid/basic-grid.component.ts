import { Component, OnInit } from '@angular/core';
import {
  CellClickedEvent,
  ColDef,
  ColumnApi, ColumnResizedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ValueFormatterParams
} from 'ag-grid-community';
import { CARS } from '../../mocks/data.mock';
import { TotalValueRendererComponent } from '../../cell-renderers/total-value-renderer/total-value-renderer.component';

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
    {
      headerName: 'Car',
      field: 'car',
      filter: true,
      pinned: 'left',
      suppressMovable: true,

    },
    { headerName: 'Model', field: 'model', rowDrag: true  },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Color', field: 'color' },
    {
      headerName: 'Mileage',
      field: 'mileage',
      minWidth: 175,
      valueFormatter: mileageFormatter,
      cellRenderer: TotalValueRendererComponent,
      sortable: false
    },
  ];

  rowSelection = 'multiple';

  rowData = CARS;

  rowStyle = { };

  gridOptions: GridOptions = {
    headerHeight: 25,
    rowHeight: 40,
    onCellClicked: (event: CellClickedEvent) => console.log(event),
    colResizeDefault: 'shift',
    // applied for all columns
    defaultColDef: {
      resizable: true,
      sortable: true
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  onColumnResized(event: ColumnResizedEvent) {
    console.log(this.gridColumnApi.getColumnState())
    console.log(event)
  }

  onGridReady(params: GridReadyEvent): void {
    console.log(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridReady = true;
    this.gridOptions.api?.sizeColumnsToFit();

  }

  onClearButtonClick(): void {
    this.gridApi?.setRowData([]);
  }

  onGetAllColumns():void {
    console.log(this.gridColumnApi.getAllColumns());
  }

  toggleTheFirstColumn(): void {
    this.gridColumnApi.setColumnsVisible(['car'], false);
    this.gridOptions.api?.sizeColumnsToFit();
  }

  onBtnHide(): void {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'model', hide: true },
        { colId: 'price', hide: true },
      ],
    });
  }

  onBtnShow(): void {
    this.gridColumnApi.applyColumnState({
      defaultState: { hide: false },
    });
  }

  onAddColumn(): void {
    const colDefs = this.gridApi.getColumnDefs();
    colDefs?.push({colId: 'tmp', headerName: 'Tmp'});
    this.gridApi.setColumnDefs(colDefs as ColDef[]);
    this.onResize();
  }

  onResize(): void {
    this.gridApi && this.gridApi.sizeColumnsToFit();
  }
}

const mileageFormatter = (params: ValueFormatterParams): string => {
  return `(${params.value})`;
};
