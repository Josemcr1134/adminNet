import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndicatorsComponent } from './indicators/indicators.component';
import { MoreInfoComponent } from './more-info/more-info.component';



const routes: Routes = [
    { path: '', 
        children: [
            {path: 'Indicators', component:IndicatorsComponent},
            {path: 'Indicators/:id/MoreInfo/:typeStatistic', component:MoreInfoComponent},
            {path:'**', redirectTo: 'Indicators'}
        ]        
},


    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GraphicsRoutingModule {}
