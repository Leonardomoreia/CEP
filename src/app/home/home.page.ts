import { Component } from '@angular/core';
import { MeuCepService } from '../services/meucep.service';
import { NavController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};
  Pet = {
    nome: '',
    idade: '',
  };

  labelBotao = 'cadastrar';

  constructor(
    public mensagem: ToastController,
    public nav: NavController,
    private cep: MeuCepService,
    public servico: EnderecosService
  ) {}

  ionViewDidEnter() {
    this.limpaDados();
  }

  cadastrar() {
    if (this.Pet.nome == '' || this.Pet.idade == '') {
      this.exibeToast('Preencha os campos necessário.', 'danger');
    } else {
      //! Acessar uma função que salva tudo em cache:
      this.salvamento();
      this.nav.navigateForward('conclusao');
    }
  }

  //! Funação que salva as coisas no cache
  salvamento() {
    this.servico.salvarPet(this.Pet.nome, this.Pet.idade);
  }

  limpaDados() {
    this.labelBotao = 'Cadastrar';
    this.Pet.nome = '';
    this.Pet.idade = '';
  }

  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
