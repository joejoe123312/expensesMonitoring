import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'expenses-list',
    loadChildren: () => import('./expenses-list/expenses-list.module').then( m => m.ExpensesListPageModule)
  },
  {
    path: 'cash-in',
    loadChildren: () => import('./modals/cash-in/cash-in.module').then( m => m.CashInPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./modals/withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {
    path: 'add-transaction',
    loadChildren: () => import('./modals/add-transaction/add-transaction.module').then( m => m.AddTransactionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
