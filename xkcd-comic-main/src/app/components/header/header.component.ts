import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ApiService } from 'src/app/services/api.service';

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
			
	}

	clickDotsMenu() {
		this.apiService.getComic(this.comicId).then(comic => {
			this.comicTitle = comic.title;
			this.lastPath.push(comic.num);
		});
		this.apiService.getRandomComic().then(comic => {
			this.comicId = comic.num;
		});

	}

	clickBackButton() {
		this.apiService.getComic(this.lastPath[this.lastPath.length-2]).then(comic => {
			setTimeout(() => (this.comicTitle = comic.title), 800);
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
