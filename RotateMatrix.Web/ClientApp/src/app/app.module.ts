import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MatrixComponent } from './matrix/matrix.component';
import { MatrixService } from './shared/matrix.service';
import { MatrixDefaultParameters } from './shared/MatrixDefaultParameters';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MatrixComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MatrixComponent, pathMatch: 'full' },
      { path: 'matrix', component: MatrixComponent}
    ])
  ],
  providers: [MatrixService,
    MatrixDefaultParameters],
  bootstrap: [AppComponent]
})
export class AppModule { }
