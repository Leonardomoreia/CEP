import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { EnderecosService } from '../services/enderecos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  PET = {
    nome: '',
    idade: '',
  };

  public Pets: any[] = [];
  public url = 'https://dog.ceo/api/breeds/image/random';
  public imagem = '';
  public result:any = {};

  

  constructor(
    public alerta: AlertController,
    public nav: NavController,
    public servicos: EnderecosService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.carregaDados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO',
      message: 'Nenhum Pet encontrado, cadastre um novo!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.navigateBack('home');
          },
        },
      ],
    });
    await voltando.present();
  }

  novo() {
    this.nav.navigateRoot('/');
  }


  gerar() {
    this.consultaApi().subscribe(
      (resp) => {
        this.result = resp;
        this.imagem = this.result.message;
      },
      (error) => {}
    );
  }
  
  consultaApi() {
    return this.http.get(this.url);
  }

  carregaDados() {
    if (this.servicos.listar()) {
      this.Pets = this.servicos.listar()!;

      if (this.Pets.length == 0) {
        this.voltar();
      }
    }
  }

  deletar(pet: string) {
    this.servicos.deletar(pet);
    this.carregaDados();
  }
}
