import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TransferEthComponent } from './layout/transfer-eth.component';

export const routes: Routes = [
    { path: '', component: TransferEthComponent },      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TransferEthRoutingModule {
}
