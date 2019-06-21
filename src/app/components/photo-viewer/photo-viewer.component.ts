import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements AfterViewInit,OnInit {

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
  constructor(private renderer: Renderer2, private imagesService: ImagesService) { }

  ngAfterViewInit() {
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal],'active');
  }

  ngOnInit(){
    this.imagesService.getImage().subscribe(
      (response)=>{
        console.log(response);
        this.photos = [];
        response.data.forEach(element => {
          this.photos = [...this.photos,{src: 'data:image/jpg;base64,'+ element }]
        });
        this.selectedPhoto = this.photos[0];
        // const reader = new FileReader();
        // reader.readAsDataURL(response);
        // reader.onload = () =>{
        //   let tmp = { src: `${reader.result}` };
        //   this.photos = [ tmp, ...this.photos];
        //   console.log(reader.result);
        // }

      },
      (error) => console.log(error)
    );
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
