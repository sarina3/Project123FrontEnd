import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { map } from 'rxjs/operators';
import { ImageMetadata } from 'src/app/model/image-metadata.model';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements AfterViewInit,OnInit {

  selectedPhoto;
  // photos = [
    // { src: '../../../assets/images/ISIC_0024306.jpg' },
    // { src: '../../../assets/images/ISIC_0024307.jpg' },
    // { src: '../../../assets/images/ISIC_0024308.jpg' },
    // { src: '../../../assets/images/ISIC_0024309.jpg' },
    // { src: '../../../assets/images/ISIC_0024310.jpg' },
  // ];
  photos = []
  allPhotos = []
  indexLocal = 0;
  indexGlobal = 0;
  
  metadata: ImageMetadata = {lastIndex: 0, all: 0, count: 10};
  @ViewChild('presentation') presentation: ElementRef;
  constructor(private renderer: Renderer2, private imagesService: ImagesService) { }

  get leftArrowEnabled(){
    return !(this.indexGlobal === 0 && this.indexLocal === 0);
  }

  get rightArrowEnabled(){
    return !(this.indexLocal + 5* this.indexGlobal >= (this.metadata.all -1)); 
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal],'active');
  }

  ngOnInit(){
    this.imagesService.getImages(this.metadata).subscribe(
      (response)=>{
        console.log(response)
        this.photos = [];
        let tmp = []
        response.data.forEach(element => {
          tmp.push({src: 'data:image/jpg;base64,'+ element })
        });
        this.photos = tmp
        this.selectedPhoto = this.photos[0];
        this.metadata = { ...response.metadata, count: 5} 
        this.allPhotos = tmp;
        console.log(this.metadata);
        console.log(this.photos);
      },
      (error) => console.log(error)
    );
  }

  next() {
    this.renderer.removeClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    if (this.indexLocal === 4) {
      this.nextPhotos();
    }
    this.indexLocal++;
    this.indexLocal = this.indexLocal % 5;
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    this.selectedPhoto = this.photos[this.indexLocal];
    
  }

  prev() {
    this.renderer.removeClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    if (this.indexLocal === 0) {
      this.prevPhotos();
      this.indexLocal = 4;
    } else {
      this.indexLocal--;
    }
    this.renderer.addClass(this.presentation.nativeElement.children[this.indexLocal], 'active');
    this.selectedPhoto = this.photos[this.indexLocal];
  }

  nextPhotos() {
    console.log('next begin');
    this.indexGlobal += 1;
    const begin = this.indexGlobal*5;
    const end = begin + 5;
    this.photos = this.allPhotos.slice(begin, end)
    this.imagesService.getImages(this.metadata).subscribe(
      (response) => {
        response.data.forEach(element => {
          this.allPhotos.push({src: 'data:image/jpg;base64,'+ element })
        });
        this.metadata = response.metadata;
        console.log('next end');
      }
    )
  }

  prevPhotos() {
    if(this.indexGlobal != 0){
      this.indexGlobal --;
      const begin = this.indexGlobal*5;
      const end = begin + 5;
      this.photos = this.allPhotos.slice(begin,end);
    }
  }
}
