import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';



const routes: Routes = [
    { 
        path: '', 
        children: [
           { path: 'login' , component: LoginComponent},
           { path: 'recover', component: RecoverComponent},
           {path: '**', redirectTo: 'login'}
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
export class AuthRoutingModule {}
