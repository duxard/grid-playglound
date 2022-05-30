import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CellClassParams,
  CellClassRules,
  CellStyle,
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
  GridSizeChangedEvent
} from 'ag-grid-community';
import { FIN_DATA } from '../../mocks/data.mock';
import { fromEvent, Subscription, Observable, Subject, timer } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

type EquityData = {
  name: string;
  bid: number;
  mid: number;
  ask: number;
  volume: number;
};

const CELL_CLASS_RULES: CellClassRules = {
  'negative-value': (params: CellClassParams):boolean => {
    return params.value < 0
  },
  'positive-value':  (params: CellClassParams):boolean => {
    return params.value >= 0
  }
};

const COLUMN_DEFS: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name',
    cellClass: 'rightBorder',
    headerClass: 'rightBorder'
  },
  {
    headerName: 'Bid',
    field: 'bid',
    cellClassRules: CELL_CLASS_RULES,
    headerClass: 'rightBorder',
    cellClass: 'rightBorder'
  },
  {
    headerName: 'Mid',
    field: 'mid',
    cellClassRules: CELL_CLASS_RULES,
    headerClass: 'rightBorder',
    cellClass: 'rightBorder'
  },
  {
    headerName: 'Ask',
    field: 'ask',
    cellClassRules: CELL_CLASS_RULES,
    headerClass: 'rightBorder',
    cellClass: 'rightBorder'
  },
  {
    headerName: 'Volume',
    field: 'volume',
    cellClassRules: CELL_CLASS_RULES,
    cellStyle: (params: CellClassParams): CellStyle => {
      if(typeof(params.value) === 'number') {
        return { textAlign: 'right' }
      } else {
        return { textAlign: 'left' }
      }
    }
  }
];

const INTERVAL: number = 500;

@Component({
  selector: 'app-basic-grid-async',
  templateUrl: './basic-grid-async.component.html',
  styleUrls: ['./basic-grid-async.component.scss']
})
export class BasicGridAsyncComponent implements OnInit, OnDestroy {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  private gridReady = false;
  private gridWidth!: number;

  private $obs!: Observable<number>;
  private $resizeObservable!: Observable<Event>;
  private $resizeSubscription!: Subscription;
  private $pollingSubscription!: Subscription;
  private $done: Subject<void> = new Subject<void>();

  columnDefs: ColDef[] = COLUMN_DEFS;

  gridOptions: GridOptions = {
    headerHeight: 25,
    rowHeight: 40,
    defaultColDef: {
      resizable: true,
      sortable: true
    }
  };

  rowData: any;

  constructor() { }

  ngOnInit(): void {
    // if we don't use tick:
    // this.rowData = of(FIN_DATA);

    // get data
    this.$obs = timer(1000, INTERVAL);
    this.$pollingSubscription = this.$obs.pipe(
      map(() => this.updateData()),
      takeUntil(this.$done)
    ).subscribe((data: any) => {
      this.gridApi.setRowData(data);
    });

    // adjust columns width on resize
    this.$resizeObservable = fromEvent(window, 'resize');
    this.$resizeSubscription = this.$resizeObservable.subscribe(() => this.onResize());
  }

  ngOnDestroy(): void {
    this.$resizeSubscription.unsubscribe();
    this.$pollingSubscription.unsubscribe();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridReady = true;

    this.onResize();
  }

  onGridSizeChanged($event: GridSizeChangedEvent): void {
    this.gridWidth = $event.clientWidth;
  }

  private onResize(): void {
    this.gridApi && this.gridApi.sizeColumnsToFit();
  }

  private updateData(): EquityData[] {
    return FIN_DATA.map((el, id, arr) => {
      return {
        name: el.name,
        bid: rand(),
        mid: rand(),
        ask: rand(),
        volume: rand()
      }
    });
  }

  onStopTicking(): void {
    this.$done.next();
    this.$done.complete();
  }
}

const rand = ():number => Math.floor(-100 + Math.random()*200);
