import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListAdviserComponent } from './list-adviser/list-adviser.component';
import { NewAdviserComponent } from './new-adviser/new-adviser.component';
import { DisabledEnabledAdviserComponent } from './disabled-enabled-adviser/disabled-enabled-adviser.component';



const routes: Routes = [

    {path: '', 
        children: [ 
            {path:'listAdviser', component:ListAdviserComponent},
            {path:'NewAdviser', component:NewAdviserComponent},
            {path: 'AdvisersEnableDisabled/:id/:type', component:DisabledEnabledAdviserComponent}
        ]}
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
export class AdvisersRoutingModule {}
