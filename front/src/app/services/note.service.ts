import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
deleteUrl="http://localhost:5000/delete-note";
addUrl="http://localhost:5000/create-note";
updateUrl="http://localhost:5000/update-note";
getUrl="http://localhost:5000/list-note";
  constructor(private http:HttpClient) { }

  // getNotes()
  // {
  //   return this.http.get(this.url);
  // }
  addNotes(data:any)
  {
    return this.http.post<any>(this.addUrl,data);
  }
  deleteNote(data:any)
  {
    return this.http.post<any>(this.deleteUrl,data);
  }
  updateNotes(data:any)
  {

    return this.http.post<any>(this.updateUrl,data);
  }
  getNotes(user_id:any)
  {
    console.log("user_id is",user_id)
    // const user={
    //   user_id:data,
    // }
    // return this.http.post<any>(this.getUrl,user);
    let query=new HttpParams().set('user_id',user_id)
    return this.http.get("http://localhost:5000/list-note",{params:query});
  }
}
