import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common'
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	comicTitle:string;
	comicId:number = 0;
	lastPath:number[] = [0];

	constructor(private apiService:ApiService, private loc: Location) { }

	ngOnInit(): void {
		this.apiService.setMaxNumber();
		//Preloads a random comic and gets id for url params
		setTimeout(() => this.apiService.getRandomComic().then(comic => {
	 		this.comicId = comic.num;
		}), 1700)
		//this.apiService.getRandomComic().then(comic => {
		//	this.comicId = comic.num;
		//});
	}

	clickDotsMenu() {
		this.apiService.getComic(this.comicId).then(comic => {
			this.comicTitle = comic.title;
			this.lastPath.push(comic.num);
		});
		this.apiService.getRandomComic().then(comic => {
			this.comicId = comic.num;
		});
		console.log(this.loc.path())
		console.log(this.loc.getState())
	}

	clickBackButton() {
		this.apiService.getComic(this.lastPath[this.lastPath.length-2]).then(comic => {
			setTimeout(() => (this.comicTitle = comic.title), 800);
			//this.comicTitle = comic.title;
			this.lastPath.pop();
		})
		.catch(err => {
			this.comicTitle = 'xkcd'
			this.lastPath = [0]
		})

		//this.loc.back();
		window.history.back();
	}
}
