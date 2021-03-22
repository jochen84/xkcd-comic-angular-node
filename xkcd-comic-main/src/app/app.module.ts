import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Transition } from "@uirouter/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ComicsComponent } from './components/comics/comics.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ApiService } from './services/api.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './loader.interceptor';

const STATES = [
	{ name: 'welcome', url: '/', component: WelcomeComponent},
	/*
	{ name: 'getcomic',
		url: '/comic',
		component: ComicsComponent,
		resolve: [
		{
			token: "comicnum",
			deps: [Transition, ApiService],
			resolveFn: (trans: Transition, apiService:ApiService) => {
				//apiService.setRandomComic();
				console.log('Lite routing funktionalitet')
			}
		}
		]
	},*/
	{ name: 'getcomicid', url: '/:id', component: ComicsComponent,
	resolve: [
	  {
		token: "comic",
		deps: [Transition, ApiService],
		resolveFn: (trans: Transition, apiService:ApiService) => apiService.getComic(trans.params().id)
	  }
	]},
]
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ComicsComponent,
		WelcomeComponent,
		LoaderComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		UIRouterModule.forRoot({ states: STATES }),
		MatToolbarModule,
		MatIconModule,
		HttpClientModule,
		MatMenuModule,
		MatProgressSpinnerModule,
	],
	providers: [
		ApiService,
		LoaderService,
		Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
