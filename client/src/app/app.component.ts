import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Dataing App';
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      let observable = this.http.get("http://localhost:5001/api/users")
      const subscription = observable.subscribe({
        next: response => this.users = response,
        error: err => console.log(err), 
        complete: () => console.log("complete")
      });
  }
}
