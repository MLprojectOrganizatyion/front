import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts.service";
import { Prediction } from "../prediction.model";
@Component({
  selector: 'app-perdiction',
  templateUrl: './perdiction.component.html',
  styleUrls: ['./perdiction.component.css']
})
export class PerdictionComponent implements OnInit {
  perdict: Prediction;

  constructor(public postsService: PostsService) {

  }

  ngOnInit() {
  }
  getPridect() {
    this.postsService.getPredict()
      .subscribe(
        perdict => this.perdict= perdict,
        error => console.error(error)
      );
    /*  this.postsService.getPredict().subscribe(postData => {
      
       this.perdict = {
         traffic_30: postData.traffic_30,
         traffic_50: postData.traffic_50,
         traffic_60: postData.traffic_60,
       };
     }); */
  }
  // this.perdict= this.postsService.getPredict()


}
