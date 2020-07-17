import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from "../post.model";
import { Modelml } from "../model.model";
import { PostsService } from "../posts.service";
import { Prediction } from "../prediction.model";

interface Model {
  value: string;
  viewValue: string;
}


@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  newModel: Modelml = new Modelml();
  perdict: Prediction;
  modelml = new FormControl('');
  form: FormGroup;
  models: Model[] = [
    { value: 'Modèles linéaires', viewValue: 'Modèles linéaires' },
    { value: 'Perceptron Multi Couches', viewValue: 'Perceptron Multi Couches' },
    { value: 'Convolutional Neural Network', viewValue: 'Convolutional Neural Network' },
    { value: 'Residual Neural Network', viewValue: 'Residual Neural Network' },
    { value: 'Radial Basis Function Network', viewValue: 'Radial Basis Function Network' },
  ];

  modelControl = new FormControl(this.models[0].value);

  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
    this.form = new FormGroup({
      model: this.modelControl
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

    this.form = new FormGroup({
      title: new FormControl(null)
    });

   // this.getPridect()
  }
  onSaveModel() {
    this.postsService.sendModel(this.newModel)
      .subscribe(data => console.log('data', data),
        error => console.log(error));
    this.newModel = new Modelml();
    //this.form.reset();
  }

  getPridect() {
    this.postsService.getPredict()
      .subscribe(
        perdict => this.perdict,
        error => console.error(error)
      );
  }












  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
