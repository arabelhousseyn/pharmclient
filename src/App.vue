<template>
  <div  id="app">
    <div v-if="!check" class="first-component">
      <router-view  />
    </div>
    <div v-if="check" class="main-component">
      <header-comp :check="check" />
    <transition name="fade" mode="out-in">
      <router-view :check="check" />
    </transition>
    <div id="seperator"></div>
    <footer-comp :check="check" />
    </div>
  </div>
</template>

<script>
import headerComp from './components/headerComp'
import footerComp from './components/footerComp'
import loginComp from './components/loginComp'
import axios from 'axios'
export default {
  components : {
    headerComp,
    footerComp,
    loginComp
  },
  data : ()=>{
    return{
      check : false,
      
    }
  },
  created()
  {
    document.addEventListener('keydown' , (e)=>{
      if(e.altKey)
      {
        switch (e.key) {
          case "c": this.$router.push('/commandes/'); break
          case "d": this.$router.push('/disconnect/'); break
        
          default: this.$router.push('/');break
        }
      }

    })

    this.check = localStorage.getItem('clientID') == undefined ? false : true

     window.onoffline = ()=>{
             window.ononline = ()=>{
               this.statu('la connexion a été rétablie','success')
               this.hero = true
             }
             if(!this.hero)
             {
               this.statu('pas de connection','error')
               this.hero = false
             }
           }
  }
}
</script>
