<template>
    <div style='height:300px;' class="wrap">
        <div id="seperator"></div>
        <div class="container">
            <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Bien joué!</h4>
  <p>Votre commande a été passée avec succès vous pouvez visiter vos commandes cliquez <a href="/commandes/">ici</a></p>
  <hr>
  <p class="mb-0">Merci de faire des affaires avec nous</p>
</div>
        </div>
    </div>
</template>
<script>
export default {
    created()
    {
        if(sessionStorage.getItem('success'))
        {
            sessionStorage.removeItem('success')
        }else{
            this.$router.push("/")
        }
    }
}
</script>