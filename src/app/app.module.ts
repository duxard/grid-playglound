import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicGridComponent } from './components/basic-grid/basic-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { TotalValueRendererComponent } from './cell-renderers/total-value-renderer/total-value-renderer.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { BasicGridAsyncComponent } from './components/basic-grid-async/basic-grid-async.component';
import { ChildComponent } from './components/child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicGridComponent,
    TotalValueRendererComponent,
    PlaygroundComponent,
    BasicGridAsyncComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([TotalValueRendererComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
