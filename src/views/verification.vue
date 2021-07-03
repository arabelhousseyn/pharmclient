<template>
    <div class="wrap">
     <verification-comp :token="token"  />
    </div>
</template>

<script>
import verificationComp from '../components/verificationComp'
import axios from 'axios'
export default {
    components : {
        verificationComp
    },
    data : ()=>{
     return{
         token : null
     }
    },
    created()
    {
       if(this.$route.query.sk !== localStorage.getItem('tokenEmail'))
       {
        this.$router.push("/")
       }else{
           this.token = localStorage.getItem('tokenEmail')
       }
    }
}
</script>