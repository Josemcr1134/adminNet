import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';



const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        canActivate:[AuthGuard],
        children: [
            {path: 'statistics', loadChildren: () => import('./graphics-statistics/graphics-statistics.module').then(m => m.GraphicsStatisticsModule)},
            {path: 'allies', loadChildren: () => import('./allies/allies.module').then(m => m.AlliesModule)},
            {path: 'affiliates', loadChildren: () => import('./affiliates/affiliates.module').then(m => m.AffiliatesModule)},
            {path: 'advisers', loadChildren: () => import('./advisers/advisers.module').then(m => m.AdvisersModule)},
            {path: 'config', loadChildren: () => import('./configs/configs.module').then(m => m.ConfigsModule)},
            {path: '**', redirectTo: 'statistics'}
            ] ,
         },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
