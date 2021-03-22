import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class ApiService {

	maxNumberComics:number;

	constructor(private http: HttpClient) { }

	getRandomComic() {
		let random = Math.floor(Math.random() * this.maxNumberComics+1);
		return this.http.get<any>(`api/${random}`).toPromise();
	}

	getComic(comicId) {
		return this.http.get<any>(`api/${comicId}`).toPromise();
	}

	setMaxNumber(){
		this.http.get<any>(`api/latest`).subscribe(comic => {
			this.maxNumberComics = comic.num;
		});
	}
}
