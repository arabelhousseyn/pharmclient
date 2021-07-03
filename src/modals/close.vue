<template>
 <div class="modal fade" id="clot" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Clôture</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        êtes-vous sûr de vouloir Clôture votre compte
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button @click="close" type="button" class="btn btn-danger">Clôture</button>
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
        data : {
          id : localStorage.getItem('clientID')
        },
      }
    },
    methods : {
       close()
          {
            var run = axios.post('http://localhost/ker/learn%20php/p-pharm/api/restrict',this.data)
            run.then((e)=>{
              if(e.data == "yes")
              {
                localStorage.clear()
                window.location.href = "/"
              }
            })
          }
    }
}
</script>