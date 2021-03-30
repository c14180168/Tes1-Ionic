import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

export interface fileFoto {
  name:string;
  path:string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  urlImageStorage : string[] = [];

  constructor(
    public fotoService:FotoService,
    private afStorage: AngularFireStorage
    ) {}

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }

  TambahFoto(){
    this.fotoService.tambahFoto();
  }

  hapusFoto(){

  }

  uploadFoto(){
    for (var index in this.fotoService.dataFoto) {
      const imgFilepath = 'imgStorage/${this.fotoService.dataFoto[index].filePath}';
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url)
        });
    });
  }
  }

}
