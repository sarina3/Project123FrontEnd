import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, TemplateRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WindowConfigService } from '../../services/window-config.service';
import { ModelService } from '../../services/model/model.service';
import { ErrorStateMatcher, MatSelect } from '@angular/material';

@Component({
  selector: 'app-model-builder',
  templateUrl: './model-builder.component.html',
  styleUrls: ['./model-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelBuilderComponent implements OnInit, OnDestroy, OnChanges {

  // networkTypes = [
  //   { id: 'cnn', title: 'CNN'},
  //   { id: 'mlp', title: 'MLP'},
  //   { id: 'gen', title: 'Geneticky algoritmus'}
  // ];
  // zakomentovane su real tieto dole su mockovane

  @ViewChild('singleSelect',{static:false}) singleSelect: TemplateRef<any>;

  @ViewChild('input',{static:false}) input:TemplateRef<any>;

  @ViewChild('multiSelect',{static:false}) multiSelect: TemplateRef<any>;

  networkTypes = [
    { id: 'cnn', title: 'CNN'},
    { id: 'cnn', title: 'MLP'},
    { id: 'cnn', title: 'Geneticky algoritmus'}
  ];

  matcher = new ErrorStateMatcher();

  modelForm = new FormGroup({
    type: new FormControl('cnn'),
    modelName: new FormControl(),

  });

  activeLayerIndex;

  layers = [];
  invalidLayers = [];
  config;
  activeLayerForm:FormGroup;

  
  get classNames(){
    if(this.config){
      const tmp = this.modelForm.get('type');
      // if(tmp.dirty){
      return this.config[tmp.value].classNames;
    }
    return [];
  }


  constructor(private windowConfig:WindowConfigService, private modelService: ModelService, private changeDetector: ChangeDetectorRef) { }

  ngOnChanges(){
    console.log('change');
  }

  ngOnInit() {
    this.resizeWindow()
    this.modelService.builderGetData().subscribe(
      data => {
        this.config = data
        console.log(data);
       
          this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy(){
    this.resizeWindow();
  }

  resizeWindow(){
    this.windowConfig.resize();
  }

  isActive(index:number){
    return +index === this.activeLayerIndex;
  }

  activate(index:number){
    this.activeLayerIndex = index;
    this.activeLayerForm = this.layers[this.activeLayerIndex];
  }

  createLayer(id:string){
    const tmpForm = new FormGroup({});
    tmpForm.addControl('class', new FormControl(id));
    const tmp = this.config[this.modelForm.get('type').value][`${id}Parameters`];
    tmp.forEach(element => {
      tmpForm.addControl(element.id,new FormControl(null,[Validators.required]));
    });
    this.layers.push(tmpForm);
    this.activate(this.layers.length - 1);
  } 

  getClass(form:FormGroup){
    const classId = form.get('class').value
    const classList:Array<any> = this.classNames;
    const tmp = classList.find(el => el.id === classId);
    if(tmp){
      return tmp.name;
    }

  }

  getProperties(){
    if(this.activeLayerForm){
      const classId = this.activeLayerForm.get('class').value;
      return this.config[this.modelForm.get('type').value][`${classId}Parameters`];
    }
    return [];
  }
  
  getTemplate(prop){
    console.log(prop);
    if(typeof prop.expectedValue === 'object'){
      if(prop.expectedValue[0] === '{}'){
        return this.multiSelect;
      }
      else{
        return this.input;
      }
    }else{
      if(prop.expectedValue === '{}'){
        return this.singleSelect;
      }else{
        return this.input;
      }
    }
  }

  isValid(index:number){
    console.log(index);
    return this.layers[index].valid;
  }

  getFormControl(label:string, index:number){
    return this.activeLayerForm.get(label);
  }

  getInvalid(){
    this.invalidLayers = [];
    this.layers.forEach((item,index) => {
      if(!item.valid){
        this.invalidLayers.push({index: index, item: item});
      }
    })
    this.activate(this.invalidLayers[0].index);
    this.changeDetector.detectChanges();
  }

  areInvalid(){
    return this.invalidLayers.length > 0;
  }
  
  checkValid(_index:number){
    if(this.layers[this.invalidLayers[_index].index].valid){
      this.invalidLayers.splice(_index,1);
    }
  }
}
