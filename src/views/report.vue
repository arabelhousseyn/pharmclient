<template>
    <div class="wrap">
       <report-comp />
    </div>
</template>

<script>
import reportComp from '../components/reportComp'
export default {
    data : ()=>{
        return{

        }
    },
    components : {
        reportComp
    },
    created()
    {
        if(localStorage.getItem('clientID') == undefined)
        {
            location.href = '/'
        }
    }
}
</script>