<template>
    <div>
        
        <div v-if="!show"  class="container">
            <div v-if="!send" id='content' class="row bold">
                <h3>Récupération de mot de passe</h3>
                    <div class="form-group row" id='srt'>
                      <label for="em" class="col-2 col-form-label">Email</label>
                      <div class="col-10">
                       <input class="form-control" @keyup="check" v-model="data.mail" type="email" placeholder="example@example.com" id="em">
                      </div>
                    </div>
                    <button :disabled="tog" @click="forget" class='btn btn-success'><font-awesome-icon icon="check-circle" /></button>
                </div>
                <div  v-if="send" id="content" class='bottom row bold'>
                    <p>Vérifiez votre boîte email nous avons envoyé le lien de vérification merci.</p>
                </div>
        </div>
        <div v-if="show" class="container">
             <div v-if="!send" id='content' class="row bold">
                <h3>Récupération de mot de passe</h3>
                    <div class="form-group row" id='srt'>
                      <label for="recpass" class="col-2 col-form-label">Mot de passe</label>
                      <div class="col-10">
                       <input class="form-control" @keyup="check" v-model="data.pass" type="password" placeholder="Mot de passe" id="recpass">
                      </div>
                    </div>

                    <div class="form-group row" id='srt'>
                      <label for="rrecpass"  class="col-2 col-form-label">re-entrer Mot de passe</label>
                      <div class="col-10">
                       <input class="form-control" @keyup="check" type="password" v-model="data.repass" placeholder="re-entrer Mot de passe" id="rrecpass">
                      </div>
                    </div>
                    <button :disabled="tog" @click="recover" class='btn btn-success'><font-awesome-icon icon="check-circle" /></button>
                </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data : ()=>{
        return{
            send : false,
            tog : true,
            show : false,
            data :{
              mail : null,
              pass : null,
              repass : null
            }
        }
    },
    methods : {
        forget()
        {
            this.tog = true
            var run = axios.post(this.link() + 'recovermail',this.data,this.cors())
            run.then((e)=>{
                if(e.data == "no")
                {
                    this.statu('email n\'existe pas','error')
                    this.tog = false
                }else{
                    localStorage.setItem('tokenEmail',e.data)
                    this.send = true
                }
            })
            run.catch((e)=>{
             console.log('err')
            })

        },
        check()
        {
            if(this.data.mail !== null)
            {
                if(this.data.mail.length > 0)
                {
                    this.tog = false
                }else{
                    this.tog = true
                }
            }

            if(this.data.pass !== null)
            {
                if(this.data.pass == this.data.repass)
                {
                    this.tog = false
                }else{
                    this.tog = true
                }
            }

            if(this.data.repass !== null)
            {
                if(this.data.pass == this.data.repass)
                {
                    this.tog = false
                }else{
                    this.tog = true
                }
            }

        },
        recover()
        {
            this.tog = true
            var rec = axios.post(this.link() + 'recovery',this.data,this.cors())
            rec.then((e)=>{
               if(e.data == 'yes')
               {
                   this.statu('Opèration effectuée','success')
                   setInterval(() => {
                       localStorage.setItem('success',true)
                       window.location.href = "/"
                   }, 1000);
               }
            })
            rec.catch((e)=>{
                console.log('err')
            })
        }
    },
    created()
    {
        if(this.$route.query.sk == null)
        {
          this.show = false
        }else{
            if(this.$route.query.sk == localStorage.getItem('tokenEmail'))
            {
                this.data.mail =  this.$route.query.mail
            this.show = true
            }else{
                window.location.href = '/'
            }
        }
        
    }
   
}
</script>