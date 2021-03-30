import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage : string[] = [];

  constructor(
    public fotoService:FotoService,
    private afStorage: AngularFireStorage
  ) {}

  async ngOnInit(){
    
  }

  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
  }

  uploadFoto(){
    for (var index in this.fotoService.dataFoto) {
      const imgFilepath = 'imgStorage/$(this.fotoService.dataFoto[index].filePath)';
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url)
        });
    });
  }
  }

}
