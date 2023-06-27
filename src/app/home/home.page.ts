import { Component } from '@angular/core';
import { MeucepService } from '../services/meucep.service';
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
  endereco = {
    Idade: '',
    Nome: '',
   
  };

  LabelBotao = 'cadastrar()'

  constructor(public mensagem: ToastController,
    public nav: NavController,
    private cep: MeucepService,
    public servico: EnderecosService
    ) {}

    ionViewDidEnter(){
        this.limpaDados();
    }

searchCEP(evento :any){
  const cepDig = evento.detail.value;

  if(cepDig.length == 8 ){
    this.cep.localizaCep(cepDig).subscribe(
      (resp)=>{
        this.dados = resp;
      if(!this.dados || this.dados.erro){
        this.exibeToast('CEP não encontrado', 'warning')
      }else{
        this.endereco.Nome = this.dados.logradouro;
        this.endereco.Idade = this.dados.bairro;
        
      }
      },
      (erro)=>{
        this.exibeToast('CEP não encontrado', 'warning')
      }
    )
    
  }
}

cadastrar(){
 if(this.dados.Nome == '' ||
      this.dados.Idade == '' 
      
      
      ){
        this.exibeToast('Preencher os campos necessários', 'danger');
      }else{
        this.salvamento();
        this.nav.navigateForward('conclusao');
      }
}

salvamento(){
    //this.enderecos.push(this.endereco)
    this.servico.salvarEndereco(
      this.dados.endereco,
      this.endereco.numero, 
      
    );

    this.nav.navigateRoot('conclusao')

  // localStorage.setItem("endereco",this.endereco.endereco)
  // localStorage.setItem("cep",this.endereco.cep)
  // localStorage.setItem("numero",this.endereco.numero)
  // localStorage.setItem("bairro",this.endereco.bairro)
  // localStorage.setItem("cidade",this.endereco.cidade)
  // localStorage.setItem("estado",this.endereco.estado)
  // localStorage.setItem("complemento",this.endereco.complemento)
}

limpaDados(){
  this.LabelBotao = 'Cadastrar'

    this.endereco.endereco = '';
    this.endereco.numero = '';
    this.endereco.complemento = '';
    this.endereco.bairro = '';
    this.endereco.cep = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';
}



async exibeToast(msg: string, cor: string){
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
