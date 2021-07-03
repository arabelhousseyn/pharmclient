<template>
    <div class="wrap">
        <profile-comp :fname="name" :lname="data.lname" :phone="data.phone" :email="data.email" :active="data.active" :username="data.username" :adrs="data.adrs" />
    </div>
</template>

<script>
import axios from 'axios'
import profileComp from '../components/profileComp'
export default {
    props : ['name'],
 components : {
     profileComp
 },
 data : ()=>{
     return{
          data : {
              username : null,
              fname : null,
              lname : null,
              phone : null,
              email : null,
              active : null,
              adrs : null,
          }
     }
 },
 created()
 {
     this.data.fname = this.$route.params.name

    var run = axios.post(this.link()+ 'clientbyusername',this.data,this.cors())
    run.then((e)=>{
        if(e.data == 'no')
        {
            window.location.href = "/"
        }else{

           if(parseInt(e.data[0].id_clients) === parseInt(localStorage.getItem('clientID')))
           {
               this.data.username = e.data[0].username
               this.data.lname = e.data[0].lname
               this.data.phone = e.data[0].phone
               this.data.email = e.data[0].email
               this.data.active = e.data[0].active
               this.data.adrs = e.data[0].adresse
           }else{
               window.location.href = "/"
           }
        }
    })
    run.catch((e)=>{
        console.log('err')
    })

    if(localStorage.getItem('clientID') == null)
        {
            this.$router.push("/")
        }
 }
}
</script>