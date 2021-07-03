<template>
    <div class="wrap">
      <div class="line">
          <div class="circle"></div>
        </div>
      <div class="card">
          <div class="card-body">
            <div class="details orders">
              <span>{{detail.date_note}}</span>
              <span>
                  <div class="form-group">
                      <textarea style="text-align:center;" disabled="true" cols="30" v-if="detail.statu_rec == 0">/</textarea>
                       <textarea disabled="true" cols="30" style="text-align:center;" v-model="detail.feedback" v-if="detail.statu_rec == 1 || detail.statu_rec == 2"></textarea>
                  </div>
              </span>
              <span> <span v-if="detail.statu_rec == 0" style='color:yellow;'>En attente</span> 
              <span v-if="detail.statu_rec == 1" style='color:green;'>Examinè</span>
              <span v-if="detail.statu_rec == 2" style="color:red;">Non examinè</span> </span>
            </div>
          </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props : ['detail']
}
</script>