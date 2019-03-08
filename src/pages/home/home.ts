import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  preview:boolean=true;
  efectoActual:string
  encendido:boolean=false;
  imagenPreview:Array<string>=[];
  formatoImagen:string='data:image/jpeg;base64,';
  efectos:Array<string>=[];
  infoFotoPage = "DatosPage";
  paramsPhotoPage = {
    imagen: "",
    imagenCoded:"",
  };
  info:string="";
  Cantidad:number=4;

  constructor(public navCtrl: NavController,private cameraPreview: CameraPreview) {
    this.getEfectos();
    const cameraDimensions:CameraPreviewDimensions={
      width: 200,
      height: 200,
    }
    this.cameraPreview.setPreviewSize(cameraDimensions)

  }

  startCamera(){
    const cameraPreviewOpts: CameraPreviewOptions = {
      x:0,
      y: window.screen.height/2,
      width: window.screen.width,
      height: window.screen.height/2-40,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: false,
      toBack: false,
      alpha: 1
    };
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
         () => {
           this.info="Camara encendida"
           this.encendido=true;
         },
         () => {
           this.info="Fallo al encender la camra"
    });
  }
  stopCamera(){this.cameraPreview.stopCamera().then(()=>{
    this.encendido=false;
  });}
  getEfectos(){
    for (const efecto in this.cameraPreview.COLOR_EFFECT) {
      this.efectos.push(efecto.toString().toLocaleLowerCase());
    }
    console.log(this.efectos)
  }
  efecto(){this.cameraPreview.setColorEffect(this.efectoActual).then(
    () => {
     this.info="Efecto "+this.efectoActual+" activado";
    },
    () => {
      this.info="Fallo al poner el efecto "+this.efectoActual;
    });
  }
  takePicture(){
    this.Cantidad=1;
    this.takePictureRafaga()
  }
  takePictureRafaga(nuevaTirada=true){
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }
    if(nuevaTirada){
      console.log("entra 1 vez solo eh")
      this.imagenPreview=[];
    }
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
         this.imagenPreview.push('data:image/jpeg;base64,' + imageData);
         console.log(this.imagenPreview)
         if(this.Cantidad>1){
          this.Cantidad--;
          this.info="foto Tomada"
           this.takePictureRafaga( false);
         }
    }, (err) => {
       this.info="fallo al tomar la foto"
       this.imagenPreview=[];
    });
  }
  mostrar(){
    this.preview=true;
    this.cameraPreview.show()
    this.info="mostrando Camara"
  }
  ocultar(){
    this.preview=false;
    this.cameraPreview.hide()
    this.info="ocultando Camara"
  }
  ponerImg(img:string){
    this.paramsPhotoPage.imagenCoded=img.substr(this.formatoImagen.length);
    this.paramsPhotoPage.imagen=img;
  }
  switchCamera(){
    this.cameraPreview.switchCamera().then(
      () => {
       this.info="Camara Cambiada";
      },
      () => {
        this.info="Fallo al cambiar la camara";
      });
    }
}
