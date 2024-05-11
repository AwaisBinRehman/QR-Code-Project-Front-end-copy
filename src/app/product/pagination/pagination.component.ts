import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages!: number;
  pages: number[] = [];

  ngOnInit() {
    this.calculateTotalPages();
    this.generatePageNumbers();
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  previousPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
}