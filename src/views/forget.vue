<template>
    <div v-if="!check" class="wrap">
          <forget-comp  />
    </div>
</template>

<script>
import forgetComp from '../components/forgetComp'
import axios from 'axios'
export default {
    data : ()=>{
      return{
          check : false,
      }
    },
    components : {
        forgetComp
    },
    created()
  {
    this.check = sessionStorage.getItem('clientID') == undefined ? false : true
  }
}
</script>