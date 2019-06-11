import { Component, OnInit } from '@angular/core';

import { Image } from '../../model/image';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  image: Image = null;
  images = [
    {
      id: '5aaf12491165976913627e89',
      name: 'ISIC_0024306.jpg',
      metaClinicalAge_approx: 45,
      metaClinicalAnatom_site_general: null,
      metaClinicalBenign_malignant: 'benign',
      metaClinicalClin_size_long_diam_mm: null,
      metaClinicalDiagnosis: 'nevus',
      metaClinicalDiagnosis_confirm_type: 'serial imaging showing no change',
      metaClinicalFamily_hx_mm: null,
      metaClinicalMel_class: null,
      metaClinicalMel_mitotic_index: null,
      metaClinicalMel_thick_mm: null,
      metaClinicalMel_type: null,
      metaClinicalMel_ulcer: null,
      metaClinicalMelanocytic: false,
      metaClinicalNevus_type: null,
      metaClinicalPersonal_hx_mm: null,
      metaClinicalSex: 'male',
      metaAcquisitionDermoscopic_type: null,
      metaAcquisitionImage_type: 'dermoscopic',
      metaAcquisitionPixelsX: 600,
      metaAcquisitionPixelsY: 450
    },
    {
      id: '5aaf12491165976913627ea0',
      name: 'ISIC_0024307.jpg',
      metaClinicalAge_approx: 55,
      metaClinicalAnatom_site_general: null,
      metaClinicalBenign_malignant: 'benign',
      metaClinicalClin_size_long_diam_mm: null,
      metaClinicalDiagnosis: 'nevus',
      metaClinicalDiagnosis_confirm_type: 'serial imaging showing no change',
      metaClinicalFamily_hx_mm: null,
      metaClinicalMel_class: null,
      metaClinicalMel_mitotic_index: null,
      metaClinicalMel_thick_mm: null,
      metaClinicalMel_type: null,
      metaClinicalMel_ulcer: null,
      metaClinicalMelanocytic: false,
      metaClinicalNevus_type: null,
      metaClinicalPersonal_hx_mm: null,
      metaClinicalSex: 'female',
      metaAcquisitionDermoscopic_type: null,
      metaAcquisitionImage_type: 'dermoscopic',
      metaAcquisitionPixelsX: 600,
      metaAcquisitionPixelsY: 450
    },
    {
      id: '5aaf12491165976913627eb6',
      name: 'ISIC_0024308.jpg',
      metaClinicalAge_approx: 60,
      metaClinicalAnatom_site_general: 'anterior torso',
      metaClinicalBenign_malignant: 'malignant',
      metaClinicalClin_size_long_diam_mm: null,
      metaClinicalDiagnosis: 'melanoma',
      metaClinicalDiagnosis_confirm_type: 'histopathology',
      metaClinicalFamily_hx_mm: null,
      metaClinicalMel_class: null,
      metaClinicalMel_mitotic_index: null,
      metaClinicalMel_thick_mm: null,
      metaClinicalMel_type: null,
      metaClinicalMel_ulcer: null,
      metaClinicalMelanocytic: false,
      metaClinicalNevus_type: null,
      metaClinicalPersonal_hx_mm: null,
      metaClinicalSex: 'male',
      metaAcquisitionDermoscopic_type: null,
      metaAcquisitionImage_type: 'dermoscopic',
      metaAcquisitionPixelsX: 600,
      metaAcquisitionPixelsY: 450
    },
    {
      id: '5aaf12491165976913627ecc',
      name: 'ISIC_0024309.jpg',
      metaClinicalAge_approx: 75,
      metaClinicalAnatom_site_general: 'lower extremity',
      metaClinicalBenign_malignant: null,
      metaClinicalClin_size_long_diam_mm: null,
      metaClinicalDiagnosis: 'pigmented benign keratosis',
      metaClinicalDiagnosis_confirm_type: 'histopathology',
      metaClinicalFamily_hx_mm: null,
      metaClinicalMel_class: null,
      metaClinicalMel_mitotic_index: null,
      metaClinicalMel_thick_mm: null,
      metaClinicalMel_type: null,
      metaClinicalMel_ulcer: null,
      metaClinicalMelanocytic: false,
      metaClinicalNevus_type: null,
      metaClinicalPersonal_hx_mm: null,
      metaClinicalSex: 'male',
      metaAcquisitionDermoscopic_type: null,
      metaAcquisitionImage_type: 'dermoscopic',
      metaAcquisitionPixelsX: 600,
      metaAcquisitionPixelsY: 450
    },
    {
      id: '5aaf124a1165976913627eee',
      name: 'ISIC_0024310.jpg',
      metaClinicalAge_approx: 75,
      metaClinicalAnatom_site_general: 'lower extremity',
      metaClinicalBenign_malignant: 'benign',
      metaClinicalClin_size_long_diam_mm: null,
      metaClinicalDiagnosis: 'nevus',
      metaClinicalDiagnosis_confirm_type: 'histopathology',
      metaClinicalFamily_hx_mm: null,
      metaClinicalMel_class: null,
      metaClinicalMel_mitotic_index: null,
      metaClinicalMel_thick_mm: null,
      metaClinicalMel_type: null,
      metaClinicalMel_ulcer: null,
      metaClinicalMelanocytic: false,
      metaClinicalNevus_type: null,
      metaClinicalPersonal_hx_mm: null,
      metaClinicalSex: 'male',
      metaAcquisitionDermoscopic_type: null,
      metaAcquisitionImage_type: 'dermoscopic',
      metaAcquisitionPixelsX: 600,
      metaAcquisitionPixelsY: 450
    },
    {
      id: '5aaf124a1165976913627f0a',
      name: 'ISIC_0024311.jpg',
      metaClinicalAge_approx: 55,
      metaClinicalAnatom_site_general: 'posterior torso',
      metaClinicalBenign_malignant: 'benign',
      metaClinicalClin_size_long_diam_mm: null,
      metaClinicalDiagnosis: 'nevus',
      metaClinicalDiagnosis_confirm_type: 'serial imaging showing no change',
      metaClinicalFamily_hx_mm: null,
      metaClinicalMel_class: null,
      metaClinicalMel_mitotic_index: null,
      metaClinicalMel_thick_mm: null,
      metaClinicalMel_type: null,
      metaClinicalMel_ulcer: null,
      metaClinicalMelanocytic: false,
      metaClinicalNevus_type: null,
      metaClinicalPersonal_hx_mm: null,
      metaClinicalSex: 'male',
      metaAcquisitionDermoscopic_type: null,
      metaAcquisitionImage_type: 'dermoscopic',
      metaAcquisitionPixelsX: 600,
      metaAcquisitionPixelsY: 450
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  showDetail(image: any) {
    const keys = [];
    for (const key in image) {
      if (image) {
        keys.push({ key: key, value: image[key] });
      }
    }
    this.image = new Image(
      keys[0].value,
      keys[1].value,
      keys[2].value,
      keys[3].value,
      keys[4].value,
      keys[5].value,
      keys[6].value,
      keys[7].value,
      keys[8].value,
      keys[9].value,
      keys[10].value,
      keys[11].value,
      keys[12].value,
      keys[13].value,
      keys[14].value,
      keys[15].value,
      keys[16].value,
      keys[17].value,
      keys[18].value,
      keys[19].value,
      keys[20].value,
      keys[21].value
    );
  }
}
