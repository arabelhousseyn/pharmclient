<template>
    <div class="disc">

    </div>
</template>

<script>
export default {
    created()
    {
        localStorage.removeItem('clientID')
        window.location.href = '/'
    }
}
</script>