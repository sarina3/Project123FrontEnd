import { Component, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { SelectData } from './select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @ViewChild('collapse', { static: true }) collapseDiv:ElementRef;
  @ViewChild('arrow', { static: true }) arrow:ElementRef;
  @ViewChild('input', { static: true }) input:ElementRef;
  @ViewChild('holder', { static: true }) wrapper:ElementRef;
  dataToShow:SelectData[];
  @Input()
  data:SelectData[];
  opened = false;
  @Input()
  selected:SelectData;

  title:string;
  @Output()
  selectedValue: EventEmitter<SelectData> = new EventEmitter<SelectData>();
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // this.data = [
    //   {id: 1 , title: 'test1'},
    //   {id: 2 , title: 'Brezno'},
    //   {id: 3 , title: 'Zilina'},
    // ];
    this.dataToShow = this.data;
    if ( this.selected ) {
      this.input.nativeElement.value = this.selected.title ;
      this.title = this.selected.title
      this.selectedValue.emit(this.selected);
    }
  }

  open(){
    if(!this.opened){
      this.opened = true;
      this.renderer.addClass(this.collapseDiv.nativeElement,'show');
      this.renderer.removeClass(this.arrow.nativeElement,'fa-angle-down');
      this.renderer.addClass(this.arrow.nativeElement,'fa-angle-up');
    }
    console.log(document.activeElement);
  }
  
  close(){
    if(this.opened){
      this.opened = false;
      this.renderer.removeClass(this.collapseDiv.nativeElement,'show');
      this.renderer.removeClass(this.arrow.nativeElement,'fa-angle-up');
      this.renderer.addClass(this.arrow.nativeElement,'fa-angle-down');
    }
  }

  toggle(){
    if(this.opened){
      this.close();
    }else{
      this.open();
    }
  }

  filter(){
    this.dataToShow = this.data.filter(elem => elem.title.toLowerCase().includes(this.title.toLowerCase()));
    if(!this.opened){
      this.open();
    }
  }

  choose(index: number){
    this.selectedValue.emit(this.dataToShow[index]);
    this.input.nativeElement.value = this.dataToShow[index].title;
    this.selected = this.dataToShow[index];
    this.title = this.selected.title;
    this.close();
  }

  @HostListener('document:click', ['$event'])
  clickout(event){
    if (!this.wrapper.nativeElement.contains(event.target) && this.opened){
      this.close();
    }
  }
}
