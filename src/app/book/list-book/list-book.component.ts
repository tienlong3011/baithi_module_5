import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteBookComponent} from "../delete-book/delete-book.component";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListBook();
  }
  getListBook(){
    this.bookService.getAllBook().subscribe(bookList =>{
      this.books = bookList;
    })
  }

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data : {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListBook();
      console.log('The dialog was closed');
    });
  }
}
