import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Post } from "./post.model";
import { Modelml } from "./model.model";
import { Prediction } from "./prediction.model";
@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private baseUrl: string;

  constructor(private http: HttpClient, private router: Router) { 
     this.baseUrl = "http://localhost:8080/ml/";
  }


/* getAdressesMail(): Observable < Model[] > {
  return this.http.get<Model[]>(this.baseUrl + 'addresses');
}
 */


getPredict(): Observable<Prediction> {
  return this.http.get<Prediction>(this.baseUrl + 'predict');
}


sendModel(model: Modelml): Observable < any > {
  console.log("model :",model);
  return this.http.post(this.baseUrl + 'model', model);
}

getPosts() {
  this.http
    .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
    .pipe(
      map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
}

getPostUpdateListener() {
  return this.postsUpdated.asObservable();
}

getPost(id: string) {
  return this.http.get<{ _id: string, title: string, imagePath: string }>(
    "http://localhost:3000/api/posts/" + id
  );
}

addPost(title: string, image: File) {
  const postData = new FormData();
  postData.append("title", title);
  postData.append("image", image, title);
  this.http
    .post<{ message: string; post: Post }>(
      "http://localhost:3000/api/posts",
      postData
    )
    .subscribe(responseData => {
      const post: Post = {
        id: responseData.post.id,
        title: title,
        imagePath: responseData.post.imagePath
      };
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
}

updatePost(id: string, title: string, image: File | string) {
  let postData: Post | FormData;
  if (typeof image === "object") {
    postData = new FormData();
    postData.append("id", id);
    postData.append("title", title);
    postData.append("image", image, title);
  } else {
    postData = {
      id: id,
      title: title,
      imagePath: image
    };
  }
  this.http
    .put("http://localhost:3000/api/posts/" + id, postData)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post: Post = {
        id: id,
        title: title,
        imagePath: ""
      };
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
}

deletePost(postId: string) {
  this.http
    .delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
}
}
