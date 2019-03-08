import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CameraPreview} from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { CameraPreviewMock} from '@ionic-native-mocks/camera-preview';
import { Base64ToGalleryMock } from '@ionic-native-mocks/base64-to-gallery';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //{ provide: CameraPreview, useClass: CameraPreviewMock },
    // { provide: Base64ToGallery, useClass: Base64ToGalleryMock },
    CameraPreview,
   Base64ToGallery,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
