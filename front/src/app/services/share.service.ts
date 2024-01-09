import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
 allNotes: any;
user_id:any;
Notes:any;
  constructor() { }
  setViewNotes(data:any)
  {
   
    
    localStorage.setItem("note",JSON.stringify(data));
    
  }
  getViewNotes()
  {
    let note=localStorage.getItem("note");
    if(note!=null || note!=undefined)
    {
      return JSON.parse(note);
    }
    return null;
   
  }
  setNotes(data:any)
  {
   
  
    localStorage.setItem("allNotes",JSON.stringify(data));
    
  }
  getNotes()
  {
    let allNotes=localStorage.getItem("allNotes");
    if(allNotes!=null || allNotes!=undefined)
    {
      return JSON.parse(allNotes);
    }
    return null;
   
  }
  setUserId(data:any)
  {
    
    localStorage.setItem("userId",JSON.stringify(data));
  }
  getUserId()
  {
   
    let userId=localStorage.getItem("userId");
    if(userId!=null || userId!=undefined)
    {
      return JSON.parse(userId);
    }
    return null;
  }
}
