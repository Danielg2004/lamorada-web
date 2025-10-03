import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.css'],
})
export class UploadPage {
  ebook: any = {
    title: '',
    author: '',
    coverFile: null as File | null,
    coverUrl: '',
    pdfFile: null as File | null,
  };

  coverPreview: string = '';   // url para <img>
  error = '';
  success = '';

  // --------- Portada (archivo) ----------
  onFileSelected(event: any) {
    const file: File = event?.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.setError('La portada debe ser una imagen (JPG/PNG/WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.setError('La imagen excede 5 MB.');
      return;
    }

    this.ebook.coverFile = file;
    this.ebook.coverUrl = '';
    this.coverPreview = URL.createObjectURL(file);
    this.clearMsg();
  }

  // Si el usuario escribe URL de portada
  onCoverUrlInput() {
    if (this.ebook.coverUrl?.trim()) {
      this.ebook.coverFile = null;
      this.coverPreview = this.ebook.coverUrl.trim();
    } else if (!this.ebook.coverFile) {
      this.coverPreview = '';
    }
  }

  // --------- PDF ----------
  onPdfSelected(event: any) {
    const file: File = event?.target?.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.setError('El archivo debe ser un PDF.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      this.setError('El PDF excede 20 MB.');
      return;
    }
    this.ebook.pdfFile = file;
    this.clearMsg();
  }

  clearPdf(ev?: MouseEvent) {
    ev?.stopPropagation();
    this.ebook.pdfFile = null;
  }

  // --------- Drag & Drop ----------
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
  }

  onDropCover(ev: DragEvent) {
    ev.preventDefault();
    const file = ev.dataTransfer?.files?.[0];
    if (!file) return;

    const fakeEvt = { target: { files: [file] } };
    this.onFileSelected(fakeEvt);
  }

  onDropPdf(ev: DragEvent) {
    ev.preventDefault();
    const file = ev.dataTransfer?.files?.[0];
    if (!file) return;

    const fakeEvt = { target: { files: [file] } };
    this.onPdfSelected(fakeEvt);
  }

  // --------- Validación y submit ----------
  isFormValid(): boolean {
    return (
      this.ebook.title.trim() !== '' &&
      (this.ebook.coverFile !== null || this.ebook.coverUrl.trim() !== '') &&
      this.ebook.pdfFile !== null
    );
  }

  onSubmit() {
    this.clearMsg();

    if (!this.isFormValid()) {
      this.setError('Completa los campos requeridos.');
      return;
    }

    if (!confirm('¿Seguro que quieres subir este eBook?')) return;

    // Guardamos en localStorage (demo)
    const stored = JSON.parse(localStorage.getItem('ebooks') || '[]');

    const newEbook = {
      id: Date.now(),
      title: this.ebook.title.trim(),
      author: this.ebook.author.trim(),
      cover: this.ebook.coverFile
        ? URL.createObjectURL(this.ebook.coverFile)
        : this.ebook.coverUrl.trim(),
      pdf: this.ebook.pdfFile?.name || '',
    };

    stored.push(newEbook);
    localStorage.setItem('ebooks', JSON.stringify(stored));

    this.success = '¡eBook subido con éxito!';
    this.resetFormData();
  }

  // --------- Utilidades ----------
  reset() {
    this.clearMsg();
    this.resetFormData();
  }

  private resetFormData() {
    this.ebook = { title: '', author: '', coverFile: null, coverUrl: '', pdfFile: null };
    this.coverPreview = '';
  }

  private setError(msg: string) {
    this.error = msg;
    this.success = '';
  }

  private clearMsg() {
    this.error = '';
    this.success = '';
  }
}
