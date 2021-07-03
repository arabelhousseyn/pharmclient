<template>
    <div>
        <main-comp v-if="check" :check="check"/>
        <login-comp v-if="!check" />
    </div>
</template>

<script>
import mainComp from '../components/mainComp'
import loginComp from '../components/loginComp'
export default {
    props : ['check'],
    components : {
        mainComp,
        loginComp
    }
}
</script>
