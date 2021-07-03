<template>
    <!-- Modal login -->
<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">S'inscrire</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <p aria-hidden="true">&times;</p>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label class='bold' for="fname">Prénom</label>
            <input type="text" v-model="data.fname"  @keyup="check1"  id="fname" class='form-control' placeholder="Prénom">
            <p class='err1' v-html="err.fname"></p>
        </div>
        <div class="form-group">
            <label class='bold' for="lname">Nom</label>
            <input type="text" v-model="data.lname" id="lname" @keyup="check1" class='form-control' placeholder="Nom">
             <p class='err2' v-html="err.lname"></p>
        </div>

        <div class="form-group">
            <label class='bold' for="username">Nom d'utilisateur</label>
            <input type="text" v-model="data.username"  id="username" @keyup="check1" class='form-control' placeholder="Nom d'utilisateur">
             <p class='err1' v-html="err.username"></p>
        </div>

        <div class="form-group">
            <label class='bold' for="phone">Téléphone</label>
            <input type="text" v-model="data.phone"  id="phone" @keyup="check1" class='form-control' placeholder="Téléphone">
             <p class='err1' v-html="err.phone"></p>
        </div>

        <div class="form-group">
            <label class='bold' for="email">Adresse email</label>
            <input type="text" v-model="data.mail"  id="email" @keyup="check1" class='form-control' placeholder="Adresse email">
             <p class='err1' v-html="err.mail"></p>
        </div>

        <div class="form-group">
            <label class='bold' for="password">Mote de passe</label>
            <div class="inp">
                <input type="password" v-model="data.pass" id="password" @keyup="check1" class='form-control' placeholder="Mote de passe">
                <div class="input-group-addon">
                     <input type="checkbox"  v-model="chk" @change="check">
                        </div>
            </div>
        </div>

        <div class="form-group">
            <label class='bold' for="re-pass">Re-entrer mote de passe</label>
            <div class="inp">
                <input type="password" v-model="data.repass" id="re-pass" @keyup="check1" class='form-control' placeholder="Mote de passe">
                <div class="input-group-addon">
                  <input type="checkbox" v-model="chk1" @change="check">
                  </div>
            </div>
        </div>
        <p v-html="err.pass"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button @click="register" :disabled='tog' type="button" class="btn btn-primary">S'inscrire</button>
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
            chk1 : false,
            tog : true,
            data : {
              fname : null,
              lname : null,
              username : null,
              phone : null,
              mail : null,
              pass : null,
              repass : null,
            },
            err :{
              fname : null,
              lname : null,
              username : null,
              phone : null,
              mail : null,
              pass : null,
            },
            autorisation : {
              fname : false,
              lname : false,
              username : false,
              phone : false,
              mail : false,
              pass : false,
              repass : false,
            }
        }
    },
    methods : {
      check()
      {
          var el = document.getElementById('password')
          var el1 = document.getElementById('re-pass')

          if(this.chk)
          {
             el.removeAttribute('type')
             el.setAttribute('type','text')
          }else{
                el.removeAttribute('type')
             el.setAttribute('type','password')
          }

          if(this.chk1)
          {
             el1.removeAttribute('type')
             el1.setAttribute('type','text')
          }else{
                el1.removeAttribute('type')
             el1.setAttribute('type','password')
          }

      },
      check1()
      {
        if(this.data.fname !== null)
        {
                 if(this.data.fname.length > 0)
                   {
                   for (let i = 0; i < this.data.fname.length; i++) {
                if(this.data.fname[i] == ' ')
                {
                  this.err.fname = "<span style='color:red;'>Prénom non valide</span>"
                  this.autorisation.fname = false
                  break;
                }else{
                  this.autorisation.fname = true
                  this.err.fname = "<span style='color:green;'>Prénom valide</span>"
                }  
             }
           }else{
             this.autorisation.fname = false
             this.err.fname = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           } 
        }

        if(this.data.lname !== null)
        {
          if(this.data.lname.length > 0)
           {
             for (let i = 0; i < this.data.lname.length; i++) {
                if(this.data.lname[i] == ' ')
                {
                  this.err.lname = "<span style='color:red;'>Nom non valide</span>"
                  this.autorisation.lname = false
                  break;
                }else{
                  this.autorisation.lname = true
                  this.err.lname = "<span style='color:green;'>Nom valide</span>"
                }  
             }
           }else{
             this.autorisation.fname = false
             this.err.lname = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           }
        }

        if(this.data.username !== null)
        {
          if(this.data.username.length > 0)
           {
             for (let i = 0; i < this.data.username.length; i++) {
                if(this.data.username[i] == ' ')
                {
                  this.err.username = "<span style='color:red;'>Nom d'utilisateur non valide</span>"
                  this.autorisation.username = false
                  break;
                }else{
                  if(this.data.username[i] == '0' || this.data.username[i] == '1' || this.data.username[i] == '2' || this.data.username[i] == '3'
                  || this.data.username[i] == '4' || this.data.username[i] == '5' || this.data.username[i] == '6' || this.data.username[i] == '7'
                  || this.data.username[i] == '8' || this.data.username[i] == '9')
                  {
                  this.autorisation.username = true
                  this.err.username = "<span style='color:green;'>Nom d'utilisateur valide</span>"
                  }else{
                   this.autorisation.username = false
                  this.err.username = "<span style='color:red;'>Le nom d'utilisateur doit contient des chiffre et des caractère</span>"
                  }
                }  
             }
           }else{
             this.autorisation.username = false
             this.err.username = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           }
        }

        if(this.data.phone !== null)
        {
          if(this.data.phone.length > 0)
           {
             for (let i = 0; i < this.data.phone.length; i++) {
                if(this.data.phone[i] == ' ')
                {
                  this.err.phone = "<span style='color:red;'>Mobile non valide</span>"
                  this.autorisation.phone = false
                  break;
                }else{
                  if(this.data.phone[i] == '0' || this.data.phone[i] == '1' || this.data.phone[i] == '2' || this.data.phone[i] == '3'
                  || this.data.phone[i] == '4' || this.data.phone[i] == '5' || this.data.phone[i] == '6' || this.data.phone[i] == '7'
                  || this.data.phone[i] == '8' || this.data.phone[i] == '9')
                  {
                    this.autorisation.phone = true
                  this.err.phone = "<span style='color:green;'>Mobile valide</span>"
                  }else{
                    this.autorisation.phone = false
                  this.err.phone = "<span style='color:red;'>Le mobile doit contient des chiffre et des caractère</span>"
                  }
                }  
             }
           }else{
             this.autorisation.phone = false
             this.err.phone = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           }
        }

        if(this.data.mail !== null)
        {
          if(this.data.mail.length > 0)
           {
             for (let i = 0; i < this.data.mail.length; i++) {
                if(this.data.mail[i] == ' ')
                {
                  this.err.mail = "<span style='color:red;'>Email non valide</span>"
                  this.autorisation.mail = false
                  break;
                }else{
                  this.autorisation.mail = true
                  this.err.mail = "<span style='color:green;'>Email valide</span>"
                }  
             }
           }else{
             this.autorisation.mail = false
             this.err.mail = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           }
        }

        if(this.data.pass !== null)
        {
          if(this.data.pass.length > 0)
           {
             if(this.data.repass !== null)
             {
               if(this.data.repass !== this.data.pass)
               {
                  this.err.pass = "<span style='color:red;'>Le mot de passe ne correspond pas</span>"
                  this.autorisation.pass = false
               }else{
                  this.err.pass = "<span style='color:green;'>Le mot de passe correspond</span>"
                  this.autorisation.pass = true
               }
             }else{
                for (let i = 0; i < this.data.pass.length; i++) {
                if(this.data.pass[i] == ' ')
                {
                  this.err.pass = "<span style='color:red;'>Mot de pass non valide</span>"
                  this.autorisation.pass = false
                  break;
                }else{
                  if(this.data.pass[i] == '0' || this.data.pass[i] == '1' || this.data.pass[i] == '2' || this.data.pass[i] == '3'
                  || this.data.pass[i] == '4' || this.data.pass[i] == '5' || this.data.pass[i] == '6' || this.data.pass[i] == '7'
                  || this.data.pass[i] == '8' || this.data.pass[i] == '9')
                  {
                   this.autorisation.pass = true
                   this.err.pass = "<span style='color:green;'>Mot de pass valide</span>"
                  }else{
                    this.autorisation.pass = false
                   this.err.pass = "<span style='color:red;'>Le mot de passe doit contient des chiffre et des caractère</span>"
                  }
                }  
             }
             }
           }else{
             this.autorisation.pass = false
             this.err.pass = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           }

        }

        if(this.data.repass !== null)
        {
          if(this.data.repass.length > 0)
           {
             if(this.data.pass !== null)
             {
               if(this.data.pass !== this.data.repass)
               {
                  this.err.pass = "<span style='color:red;'>Le mot de passe ne correspond pas</span>"
                  this.autorisation.repass = false
               }else{
                  this.err.pass = "<span style='color:green;'>Le mot de passe correspond</span>"
                  this.autorisation.repass = true
                    }
             }
           }else{
             this.autorisation.repass = false
             this.err.pass = "<span style='color:red;'>S'il vous plaît remplir le champs</span>"
           }

        }
         
        if(this.autorisation.fname && this.autorisation.lname && this.autorisation.username && this.autorisation.mail &&
        this.autorisation.pass && this.autorisation.repass)
        {
          this.tog = false
        }else{
          this.tog = true
        }
      },
       register()
      {
        this.tog = true
          const push = axios.post('http://localhost/ker/learn%20php/p-pharm/api/register',this.data)
          push.then((e)=>{
            if(e.data == "no")
            {
              this.statu('error','error')
            }else{ 
              
              this.statu('Opèration effectuée','success')
              setInterval(() => {
                localStorage.setItem('tokenEmail',e.data)
                window.location.href = "http://localhost:8080/verification/?sk=" + e.data
              }, 2000);
            }
          })
          .catch(()=>{
            console.log('error')
          })
      }
    }
}
</script>