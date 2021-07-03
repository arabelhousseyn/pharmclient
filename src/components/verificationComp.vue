<template>
    <div id='verification'>
        <div  class="container">
            <div  id='content' class="row bold">
                <h3>Vèrifier votre compte</h3>
                    <div class="form-group row" id='srt'>
                      <label for="em" class="col-2 col-form-label">Code verification</label>
                      <div class="col-10">
                       <input class="form-control" v-model="data.code" @keyup="test" type="number" placeholder="ex : 4532" id="em">
                      </div>
                    </div>
                    <button :disabled="tog" @keyup.enter="verify" @click="verify" class='btn btn-success'><font-awesome-icon icon="check-circle" /></button>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['token'],
    data : ()=>{
        return{
            tog : true,
            data : {
                token : null,
                code : null
            },
        }
    },
    methods : {
        verify()
        {
            this.tog = true
            this.data.token = this.token
            var run = axios.post(this.link() + 'verifytoken',this.data,this.cors())
            run.then((e)=>{
                if(e.data == 'nocode')
                {
                    this.tog = false
                    this.statu('Code de vérification incorrect','error')
                }else if(e.data == "yes")
                {
                    localStorage.removeItem('tokenEmail')
                    localStorage.setItem('success',true)
                    this.$router.push("/")
                }
            })
            run.catch((e)=>{
                console.log('err')
            })
        },
        test()
        {
            if(this.data.code !== null)
            {
                if(this.data.code.length > 0)
                {
                    this.tog = false
                }else{
                    this.tog = true
                }
            }
        }
    }


}
</script>