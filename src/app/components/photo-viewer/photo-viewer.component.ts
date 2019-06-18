import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements AfterViewInit {

  selectedPhoto = { src: '../../../assets/images/ISIC_0024306.jpg' };
  photos = [
    { src: '../../../assets/images/ISIC_0024306.jpg' },
    { src: '../../../assets/images/ISIC_0024307.jpg' },
    { src: '../../../assets/images/ISIC_0024308.jpg' },
    { src: '../../../assets/images/ISIC_0024309.jpg' },
    { src: '../../../assets/images/ISIC_0024310.jpg' },
  ];
  indexLocal = 0;
  indexGlobal = 0;
  @ViewChild('presentation') presentation: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal],'active');
  }

  next() {
    if (this.indexLocal === 4) {
      this.nextPhotos();
    }
    this.renderer.removeClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    this.indexLocal++;
    this.indexLocal = this.indexLocal % 5;
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    this.selectedPhoto = this.photos[this.indexLocal];
  }

  prev() {
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    if (this.indexLocal === 0) {
      this.prevPhotos();
      this.indexLocal = 4;
    } else {
      this.indexLocal--;
    }
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    this.selectedPhoto = this.photos[this.indexLocal];
  }

  nextPhotos() {}

  prevPhotos() {}
}
