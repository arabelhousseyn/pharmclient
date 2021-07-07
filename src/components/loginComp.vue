<template>
    <div class="login default">
       <div class="container">
           <div class="card">
               <div class="card-body center">
                   <h2>Connexion</h2>
                   <div class="form-group">
            <label class='bold' for="iden">Téléphone / Nom d'utilisateur</label>
            <input type="text" v-model="data.iden" id="iden" @keyup="check1" class='form-control' placeholder="Téléphone / Nom d'utilisateur">
            <p v-html="err.iden"></p>
        </div>
        <div class="form-group">
            <label class='bold' for="pass">Mote de passe</label>
            <div class="inp">
                <input type="password" v-model="data.pass" @keyup="check1" id="pass" class='form-control' placeholder="Mote de passe">
                <div class="input-group-addon">
                  <input type="checkbox" v-model="chk" @change="check">
                  </div>
            </div>
            <p v-html="err.pass"></p>
        </div>
        <div class="cont">
          <a href="/forget">Mote de passe oubliè ? </a>
        </div>
        <button :disabled="tog" @click="connect" type="button" class="btn btn-primary">Connexion</button>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
        return{
            chk : false,
            tog : true,
            data : {
              iden : null,
              pass : null,
            },
            err : {
              iden : null,
              pass : null,       
            },
            autorisation : {
              iden : null,
              pass : null
            }
        }
    },
    methods : {
      check()
      {
          var el = document.getElementById('pass')
          if(this.chk)
          {
             el.removeAttribute('type')
             el.setAttribute('type','text')
          }else{
                el.removeAttribute('type')
             el.setAttribute('type','password')
          }
      },
      check1()
      {
         if(this.data.iden !== null)
         {
           if(this.data.iden.length > 0)
           {
             this.err.iden = '<span style="color:green;">Identification valide</span>';
             this.autorisation.iden = true
           }else{
             this.err.iden = '<span style="color:red;">s\'il vous plaît remplir votre champ</span>';
             this.autorisation.iden = false
           }
         }

         if(this.data.pass !== null)
         {
           if(this.data.pass.length > 0)
           {
             this.err.pass = '<span style="color:green;">Mot de pass valide</span>';
             this.autorisation.pass = true
           }else{
             this.err.pass = '<span style="color:red;">s\'il vous plaît remplir votre champ</span>';
             this.autorisation.pass = false
           }
         }
         if(this.autorisation.iden && this.autorisation.pass)
         {
           this.tog = false
         }else{
           this.tog = true
         }
      },
      connect()
      {
        this.tog = true
        var run = axios.post(this.link() + 'login',this.data,this.cors())
        run.then((e)=>{
          if(e.status == 200)
          {
            if(e.data == "no")
           {
             this.statu('Le identificateur non valide','error')
             this.tog = false
           }else if(e.data == "nopass")
           {
             this.statu('Le mot de passe non valide','error')
             this.tog = false
           }else if(e.data.length > 10){
             localStorage.setItem('tokenEmail',e.data)
             this.statu('Votre compte n\'est activè veuillez le réactiver consulter votre boîte mail','error')
             this.tog = false
           }
           else if(e.data == "noactive"){
             this.statu('votre compte est cloturè vous devez consulter votre support','warning')
           }else{
             localStorage.setItem('clientID',e.data)
             window.location.reload();
           }
          }else{
            this.statu('Erreur dans server','error')
          }           
        })
        run.catch((e)=>{
          console.log('err')
        })
      }
    }
}
</script>