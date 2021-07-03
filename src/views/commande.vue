<template>
    <div>
        <commande-comp />
    </div>
</template>
<script>
import commandeComp from '../components/commandeComp'
export default {
    components : {
        commandeComp
    },
    created()
    {
        window.document.title = "commandes"
        if(localStorage.getItem('clientID') == null)
        {
            this.$router.push("/")
        }
    }
}
</script>