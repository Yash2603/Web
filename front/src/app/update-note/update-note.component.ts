import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { ShareService } from '../services/share.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
  note_id: any;
  name = 'Angular 6';
  htmlContent = '';
  htmlTitle = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '10rem',
    placeholder: 'Enter text in this rich text editor....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };
  constructor(private router: Router, private share: ShareService, private note: NoteService) {
    //fetching current data of note from share service 
    let userId = localStorage.getItem('userId');
    if (!userId) {
      alert("please login");
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    this.htmlContent = this.share.getViewNotes().note_content
    this.htmlTitle = this.share.getViewNotes().note_title;
    console.log("Note-content", this.htmlContent);
    console.log("Note-title", this.htmlContent);
  }
  //updating changes in the Note
  submit(f: any) {



    let note_id = this.share.getViewNotes()._id;
    let userId = localStorage.getItem('userId');
    const updateNote =
    {
      user_id: userId,
      note_id: note_id,
      note_title: f.value.Note_Tittle,
      note_content: this.htmlContent
    }
    if (!updateNote.note_title || !updateNote.note_content) {
      alert("Title and Content Can't be Empty")
    }
    else {
      console.log("updated  note is ", updateNote);
      this.note.updateNotes(updateNote).subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          alert("Your Note Has been Updated Successfully");

          console.log("upadte response", res);
          this.share.setNotes(res.notes);
          this.router.navigate(['user_notes']);
        }
        else {
          alert("Unable to Update Note!");
        }

      })
    }
  }
  //redirecting to home
  home() {

    this.router.navigate(['/user_notes'])
  }

}
