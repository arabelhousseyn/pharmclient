<template>
    <div>
      <display-commande />
    </div>
</template>
<script>
import displayCommande from '../components/displayCommande'
export default {
    components : {
        displayCommande
    },
    created()
    {
        if(localStorage.getItem('clientID') == null)
        {
            this.$router.push("/")
        }
    }
}
</script>