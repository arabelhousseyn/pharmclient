<template>
<div class="3245">
    <div id="seperator"></div>
    <div class="hero">
        <h3 class='center'>Mon Compte</h3>
        <hr style='width:50%'>
        <div class="hero-text center">
            <h5>Nom Complet :  <span v-if="data.lname == null">{{fname}}</span> <span v-else>{{data.fname}}</span> <span v-if="data.lname == null">{{lname}}</span> <span v-else>{{data.lname}}</span></h5>
            <h5>Username :  <span v-if="data.username == null">{{username}}</span> <span v-else>{{data.username}}</span></h5>
            <h5>E-mail :  <span v-if="data.email == null">{{email}}</span> <span v-else>{{data.email}}</span></h5>
  </div>
    </div>
    <div id="seperator"></div>
    <div class="hero">
 <div class='container'>
     <div class="row">
         <div class="col-lg-3"></div>
         <div class="col-lg-6">
<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#v-pills-info">Informations de base</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#v-pills-secure">Sécurité</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#v-pills-adv">Avancé</a>
    </li>
  </ul>

  <div class="tab-content">
    <div id="v-pills-info" class="container tab-pane active"><br>
    <div class="form-group">
          <label for="fname" class='bold'>Prènom</label>
          <input @keyup="check" type="text" v-model="data.fname" placeholder="Prènom" id='fname' class='form-control'>
         <p v-if="data.fname == null" >{{fname}}</p>
         <p v-if="data.fname !== null" >{{data.fname}}</p> 
      </div>

      <div class="form-group">
          <label for="lname" class='bold'>Nom</label>
          <input @keyup="check" type="text" v-model="data.lname" placeholder="Nom" id='lname' class='form-control'>
          <p v-if="data.lname == null" >{{lname}}</p>
         <p v-if="data.lname !== null" >{{data.lname}}</p> 
      </div>

      <div class="form-group">
          <label for="username" class='bold'>Nom d'utilisateur</label>
          <input @keyup="check" type="text" v-model="data.username" placeholder="Nom d'utilisateur" id='username' class='form-control'>
          <p v-if="data.username == null" >{{username}}</p>
         <p v-if="data.username !== null" >{{data.username}}</p> 
      </div>

      <div class="form-group">
          <label for="email" class='bold'>Email</label>
          <input @keyup="check" type="email" v-model="data.email" placeholder="Email" id='email' class='form-control'>
          <p v-if="data.email == null" >{{email}}</p>
         <p v-if="data.email !== null" >{{data.email}}</p> 
      </div>

      <div class="form-group">
          <label for="phone" class='bold'>Mobile</label>
          <input @keyup="check" type="text" v-model="data.phone" placeholder="Mobile" id='phone' class='form-control'>
          <p v-if="data.phone == null" >{{phone}}</p>
         <p v-if="data.phone !== null" >{{data.phone}}</p> 
      </div>

      <div class="form-group">
          <label for="adrs" class='bold'>Adresse</label>
          <input @keyup="check" type="text" v-model="data.adrs" placeholder="Adresse" id='adrs' class='form-control'>
          <p v-if="data.adrs == null" >{{adrs}}</p>
         <p v-if="data.adrs !== null" >{{data.adrs}}</p> 
      </div>
      <button :disabled="tog" @click="change" class='btn btn-success'><font-awesome-icon icon="check-circle" /></button>
    </div>
    <div id="v-pills-secure" class="container tab-pane fade"><br>
    <div class="form-group">
          <label for="old" class='bold'>Ancien mot de passe</label>
          <input type="password" v-model="change1.old"  id="old" @keyup="check1" class='form-control' placeholder="Ancine mot de passe">
      </div>

      <div class="form-group">
          <label for="new" class='bold'>Nouveau mot de passe</label>
          <input type="password" v-model="change1.new"  @keyup="check1" id="new" class='form-control' placeholder="Nouveau mot de passe">
      </div>

      <div class="form-group">
          <label for="rnew" class='bold'>Re-entrer Nouveaux mot de passe</label>
          <input type="password" v-model="change1.rnew" @keyup="check1"  id="rnew" class='form-control' placeholder="Re-entrer Nouveaux mot de passe">
      </div>
      <p v-html="err.pass"></p>
      <button :disabled="tog1" @click="changepass" class='btn btn-success'><font-awesome-icon icon="check-circle" /></button>
    </div>
    <div id="v-pills-adv" class="container tab-pane fade"><br>
    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#clot">
    Clôture votre compte <font-awesome-icon icon="lock" />
</button>
    </div>
  </div>

<div class="tab-content" id="v-pills-tabContent">
  <div class="tab-pane fade show active center" id="v-pills-info" role="tabpanel" aria-labelledby="v-pills-home-tab">
      
  </div>
  <div class="tab-pane fade center" id="v-pills-secure" role="tabpanel" aria-labelledby="v-pills-profile-tab">
      
  </div>
  <div class="tab-pane fade center" id="v-pills-adv" role="tabpanel" aria-labelledby="v-pills-profile-tab">
  </div>
</div>
</div>
</div>
    </div>        
    </div>
    <close-modal />
</div>
</template>

<script>
import axios from 'axios'
import closeModal from '../modals/close'
export default {
    props : ['fname','lname','username','phone','email','active','adrs'],
    components : {
        closeModal
    },
    data : ()=>{
        return{
            tog : true,
            tog1 : true,
            data : {
                id : localStorage.getItem('clientID'),
                fname : null,
                lname : null,
                username : null,
                phone : null,
                email : null,
                active : null,
                adrs : null,
            },
            change1 : {
                id : localStorage.getItem('clientID'),
                old : null,
                new : null,
                rnew : null
            },
            err : {
                pass : null
            }
        }
    },
    methods :{
        check()
        {
            this.tog = false
        },
        change()
        {
            this.tog = true
            var run = axios.post(this.link() + 'updatebyclient',this.data,this.cors())
            run.then((e)=>{
               if(e.data == "yes")
               {
                   this.statu('Opèration effectuée','success')
                   this.tog = false
               }
            })
            run.catch((e)=>{
               console.log('err')
            })
        },
        check1()
        {
           this.tog1 = false 

           if(this.change1.new == this.change1.rnew)
           {
               this.tog1 = false
               this.err.pass = '<span style="color:green;">Correct</span>'
           }else{
               this.err.pass = '<span style="color:red;">Le mot de passe ne correspond pas</span>'
               this.tog1 = true
           }
        },
        changepass()
        {
            this.tog1 = true
            var tmp = axios.post(this.link() + 'changepass',this.change1,this.cors())
            tmp.then((e)=>{
                if(e.data == "yes")
                {
                   this.statu('Opèration effectuée','success') 
                    this.tog1 = false
                    localStorage.clear();
                    window.location.href = '/'
                }else if(e.data == "no")
                {
                    this.statu('Ancien mot de passe incorrect','error')
                    this.tog1 = false
                }
            })
            tmp.catch((e)=>{
                console.log('err')
            })
        }
    },
    created()
    {
        window.document.title = this.$route.params.name
    }
}
</script>