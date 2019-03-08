import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the DatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html',
})
export class DatosPage {
  imagen:string=null;
  imagenCoded:string=null;
  info:string;
  nombre:string
  constructor(public navCtrl: NavController, public navParams: NavParams, private base64ToGallery: Base64ToGallery,private androidPermissions: AndroidPermissions) {
    this.imagen=navParams.get("imagen");
    this.imagenCoded=navParams.get("imagenCoded")
    console.log(this.imagen)
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      res => console.log("tienes permisos"),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }
  ionViewDidLoad() {
  }

  guardarFoto(){
    let option : Base64ToGalleryOptions = {
      prefix: this.nombre,
      mediaScanner: false
  };
  let decoded = atob(this.imagenCoded);
  console.log("--------------------------------------------------------------")
  console.log("decoded: "+this.imagenCoded)
  console.log("..............................................................")
  console.log("normal: "+this.imagen)
  console.log("--------------------------------------------------------------")
    this.base64ToGallery.base64ToGallery(btoa(decoded),option).then(
      () => {
        this.info="foto guardada"
      },
      (err) => {
        this.info="Fallo al guardar" + err
 });
}
}
