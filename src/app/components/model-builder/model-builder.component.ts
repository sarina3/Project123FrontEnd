import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, TemplateRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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

  @ViewChild('singleSelect', {static: false}) singleSelect: TemplateRef<any>;

  @ViewChild('input', {static: false}) input: TemplateRef<any>;

  @ViewChild('multiSelect', {static: false}) multiSelect: TemplateRef<any>;

  networkTypes = [
    {id: 'cnn', title: 'CNN'},
    {id: 'mlp', title: 'MLP'},
    {id: 'cnn', title: 'Geneticky algoritmus'}
  ];

  matcher = new ErrorStateMatcher();

  modelForm = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    modelName: new FormControl(null, [Validators.required]),
    // optimizer: new FormControl(null,[Validators.required]);
  });

  optimizerForm = new FormGroup({
    loss: new FormControl(null, Validators.required),
    optimizer: new FormControl(null, Validators.required),
    metrics: new FormControl(null, Validators.required)
  });

  activeLayerIndex;

  layers = [];
  invalidLayers = [];
  config;
  activeLayerForm: FormGroup;


  get classNames() {
    if (this.config) {
      const tmp = this.modelForm.get('type');
      if (tmp.value !== null) {
        return this.config[tmp.value].classNames;
      }
    }
    return [];
  }


  constructor(private windowConfig: WindowConfigService, private modelService: ModelService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnChanges() {
    // console.log('change');
  }

  ngOnInit() {
    this.resizeWindow();
    this.modelService.builderGetData().subscribe(
      data => {
        this.config = data;
        console.log(data);
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.resizeWindow();
  }

  resizeWindow() {
    this.windowConfig.resize();
  }

  isActive(index: number) {
    return +index === this.activeLayerIndex;
  }

  activate(index: number) {
    this.activeLayerIndex = index;
    this.activeLayerForm = this.layers[this.activeLayerIndex];
  }

  createLayer(id: string) {
    const tmpForm = new FormGroup({});
    tmpForm.addControl('class', new FormControl(id));
    const tmp = this.config[this.modelForm.get('type').value][`${id}Parameters`];
    tmp.forEach(element => {
      if (typeof element.expectedValue === 'object') {
        if (element[0] === '{}') {
          tmpForm.addControl(element.id, new FormControl(null, [Validators.required]));

        } else {
          tmpForm.addControl(element.id, new FormControl(null, [Validators.required, this.arrayValidator(element.expectedValue)]));
        }
      } else {
        if (element === '{}') {
          tmpForm.addControl(element.id, new FormControl(null, [Validators.required]));
        } else {
          tmpForm.addControl(element.id, new FormControl(null, [Validators.required, this.validator(element.expectedValue)]));
        }
      }
    });
    this.layers.push(tmpForm);
    this.activate(this.layers.length - 1);
  }

  getClass(form: FormGroup) {
    const classId = form.get('class').value;
    const classList: Array<any> = this.classNames;
    const tmp = classList.find(el => el.id === classId);
    if (tmp) {
      return tmp.name;
    }

  }

  arrayValidator(pattern: Array<string>): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value === null) {
        return {'dimension does not fit the expected dimension': false};
      }
      const tmp = c.value.split(',');
      console.log(tmp);
      if (tmp.length !== pattern.length) {
        return {'dimension does not fit the expected dimension': false};
      }
      let ok = true;
      tmp.forEach((element, index) => {
        if (pattern[index] === 'number') {
          const _pattern = new RegExp('[0-9]+');
          if (_pattern.test(element) === false) {
            ok = false;
          }
        } else {
          if (typeof element !== pattern[index]) {
            ok = false;
          }
        }
      });
      if (ok) {
        return null;
      } else {
        return {'types does not match': true};
      }
    };
  }

  validator(pattern: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      console.log(c.value);
      if (pattern === 'number') {
        const numPattern = new RegExp('[0-9]+');
        if (numPattern.test(c.value)) {
          return null;
        } else {
          return {'element types doesn\'t match': true};
        }
      } else {
        return null;
      }
    };
  }

  getProperties() {
    if (this.activeLayerForm) {
      const classId = this.activeLayerForm.get('class').value;
      return this.config[this.modelForm.get('type').value][`${classId}Parameters`];
    }
    return [];
  }

  getOptimizer(param: string) {
    // console.log(param);
    if (this.config) {
      const type = this.modelForm.get('type').value;
      if (type) {
        return this.config[type].optimizer[param];
      }
    }
    return [];
  }

  getTemplate(prop) {
    if (typeof prop.expectedValue === 'object') {
      if (prop.expectedValue[0] === '{}') {
        return this.multiSelect;
      } else {
        return this.input;
      }
    } else {
      if (prop.expectedValue === '{}') {
        return this.singleSelect;
      } else {
        return this.input;
      }
    }
  }

  isValid(index: number) {
    return this.layers[index].valid;
  }

  getFormControl(label: string, index: number) {
    return this.activeLayerForm.get(label);
  }

  getInvalid() {
    this.invalidLayers = [];
    this.layers.forEach((item, index) => {
      if (!item.valid) {
        this.invalidLayers.push({index: index, item: item});
      }
    });
    if (this.invalidLayers.length > 0) {
      this.activate(this.invalidLayers[0].index);
    }
    this.changeDetector.detectChanges();
  }

  areInvalid() {
    return this.invalidLayers.length > 0;
  }

  checkValid(_index: number) {
    if (this.layers[this.invalidLayers[_index].index].valid) {
      this.invalidLayers.splice(_index, 1);
    }
  }

  getHint(prop) {
    return prop.expectedValue;
  }

  getError(prop) {
    let err = '';
    const errsObj = this.activeLayerForm.get(prop.id).errors;
    if (errsObj) {
      Object.keys(errsObj).forEach((elem) => {
        err = elem;
      });
    }
    return err;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  isValidAll() {
    let valid = true;
    valid = this.modelForm.valid ? valid : false;
    this.layers.forEach(elem => {
      valid = elem.valid ? valid : false;
    });
    return valid;
  }


  submit() {
    if (this.isValidAll()) {
      console.log(this.modelForm.value);
      console.log(this.optimizerForm.value);
      let tmp = {...this.modelForm.value, ...this.optimizerForm.value, layers: []};
      this.layers.forEach(el => {
        tmp.layers.push(el.value);
      });
      this.modelService.buildModel(tmp);
    }
  }

  close(index) {
    this.layers.splice(index, 1);
    if (index === this.activeLayerIndex) {
      const newIndex = index - 1;
      if (this.layers.length > 0) {
        newIndex >= 0 ? this.activate(newIndex) : this.activate(0);
      } else {
        this.activeLayerForm = null;
        this.changeDetector.detectChanges();
      }
    }
  }
}
