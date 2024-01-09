import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { ShareService } from '../services/share.service';
import { NoteService } from '../services/note.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],


})
export class NoteComponent {
  //angular rich text editor kelkov litbrary
  name = 'Angular 6';
  htmlContent = '';
  note_title: any;
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
    let userId = localStorage.getItem('userId');
    if (!userId) {
      alert("please login");
      this.router.navigate(['login']);
    }
  }
  //set title function
  set_title(input: HTMLInputElement) {

    this.note_title = input.value;
  }
  // creating a new note function
  submit() {

    console.log("htmlContent is", this.htmlContent);
    let element;

    let user_id = this.share.getUserId();

    const newNote =
    {
      user_id: user_id,
      note_title: this.note_title,
      note_content: this.htmlContent
    }
    if (!newNote.note_title || !newNote.note_content) {
      alert("Title and Content Can't be Empty")
    }
    else {
      this.note.addNotes(newNote).subscribe(res => {

        let allNotes = res.notes;
        if (res.status == 200) {
          alert("Your Note Has been Added Successfully");
          this.router.navigate(['user_notes']);
          this.share.setNotes(allNotes);
        }
        else {
          alert("Unable to add Note!");
        }

      })
    }
  }
  // home icon redirecting to home
  home() {

    this.router.navigate(['/user_notes'])
  }
}





