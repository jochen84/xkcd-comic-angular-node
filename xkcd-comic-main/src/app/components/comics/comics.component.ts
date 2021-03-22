import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
	selector: 'app-comics',
	templateUrl: './comics.component.html',
	styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

	@Input() comic;
	loading:boolean = false;
	img:string;
	
	constructor(private apiService:ApiService) { }

	ngOnInit(): void {
		//Starts a spinner every time /comic is loaded
		this.loading = true;
		setTimeout(() => this.loading = false, 2000);
		this.apiService.getComic(this.comic.num).then(comic => {
			this.img = comic.img;
		})
	}
}
