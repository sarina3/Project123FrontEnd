export class Image {
    image: string;
    id: string;
    name: string;
    metaClinicalAge_approx: number;
    metaClinicalAnatom_site_general: string;
    metaClinicalBenign_malignant: string;
    metaClinicalClin_size_long_diam_mm: any;
    metaClinicalDiagnosis: string;
    metaClinicalDiagnosis_confirm_type: string;
    metaClinicalFamily_hx_mm: any;
    metaClinicalMel_class: any;
    metaClinicalMel_mitotic_index: any;
    metaClinicalMel_thick_mm: any;
    metaClinicalMel_type: any;
    metaClinicalMel_ulcer: any;
    metaClinicalMelanocytic: boolean;
    metaClinicalNevus_type: any;
    metaClinicalPersonal_hx_mm: any;
    metaClinicalSex: string;
    metaAcquisitionDermoscopic_type: any;
    metaAcquisitionImage_type: string;
    metaAcquisitionPixelsX: number;
    metaAcquisitionPixelsY: number;

    constructor(
        image: string,
        id?: string,
        name?: string,
        metaClinicalAge_approx?: number,
        metaClinicalAnatom_site_general?: string,
        metaClinicalBenign_malignant?: string,
        metaClinicalClin_size_long_diam_mm?: any,
        metaClinicalDiagnosis?: string,
        metaClinicalDiagnosis_confirm_type?: string,
        metaClinicalFamily_hx_mm?: any,
        metaClinicalMel_class?: any,
        metaClinicalMel_mitotic_index?: any,
        metaClinicalMel_thick_mm?: any,
        metaClinicalMel_type?: any,
        metaClinicalMel_ulcer?: any,
        metaClinicalMelanocytic?: boolean,
        metaClinicalNevus_type?: any,
        metaClinicalPersonal_hx_mm?: any,
        metaClinicalSex?: string,
        metaAcquisitionDermoscopic_type?: any,
        metaAcquisitionImage_type?: string,
        metaAcquisitionPixelsX?: number,
        metaAcquisitionPixelsY?: number
    ) {
        this.image = image,
        this.id = id,
        this.name = name,
        this.metaClinicalAge_approx = metaClinicalAge_approx,
        this.metaClinicalAnatom_site_general = metaClinicalAnatom_site_general,
        this.metaClinicalBenign_malignant = metaClinicalBenign_malignant,
        this.metaClinicalClin_size_long_diam_mm = metaClinicalClin_size_long_diam_mm,
        this.metaClinicalDiagnosis = metaClinicalDiagnosis,
        this.metaClinicalDiagnosis_confirm_type = metaClinicalDiagnosis_confirm_type,
        this.metaClinicalFamily_hx_mm = metaClinicalFamily_hx_mm,
        this.metaClinicalMel_class = metaClinicalMel_class,
        this.metaClinicalMel_mitotic_index = metaClinicalMel_mitotic_index,
        this.metaClinicalMel_thick_mm = metaClinicalMel_thick_mm,
        this.metaClinicalMel_type = metaClinicalMel_type,
        this.metaClinicalMel_ulcer = metaClinicalMel_ulcer,
        this.metaClinicalMelanocytic = metaClinicalMelanocytic,
        this.metaClinicalNevus_type = metaClinicalNevus_type,
        this.metaClinicalPersonal_hx_mm = metaClinicalPersonal_hx_mm,
        this.metaClinicalSex = metaClinicalSex,
        this.metaAcquisitionDermoscopic_type = metaAcquisitionDermoscopic_type,
        this.metaAcquisitionImage_type = metaAcquisitionImage_type,
        this.metaAcquisitionPixelsX = metaAcquisitionPixelsX,
        this.metaAcquisitionPixelsY = metaAcquisitionPixelsY;
    }
}
