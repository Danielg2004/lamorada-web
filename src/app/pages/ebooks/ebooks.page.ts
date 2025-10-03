import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ebooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ebooks.page.html',
  styleUrls: ['./ebooks.page.css'],
})
export class EbooksPage implements OnInit {
  ebooks: Array<{
    id: number;
    title: string;
    author: string;
    cover: string; // url/objURL
    pdf: string;   // nombre del archivo
  }> = [];

  ngOnInit() {
    this.loadEbooks();
  }

  trackById = (_: number, e: any) => e.id;

  loadEbooks() {
    this.ebooks = JSON.parse(localStorage.getItem('ebooks') || '[]');
  }

  deleteEbook(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este eBook?')) return;
    this.ebooks = this.ebooks.filter(e => e.id !== id);
    localStorage.setItem('ebooks', JSON.stringify(this.ebooks));
  }
}
