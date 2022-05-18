import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-total-value-renderer',
  template: `
         <span>
             <span>{{cellValue}}</span>&nbsp;
             <button (click)="buttonClicked()">Push For Total</button>
         </span>
   `
})
export class TotalValueRendererComponent implements ICellRendererAngularComp  {

  public cellValue!: string;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  // gets called whenever the cell refreshes
  // @ts-ignore
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
  }

  buttonClicked() {
    alert(`${this.cellValue} is the total mileage!`)
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
