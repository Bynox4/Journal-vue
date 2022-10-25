<template>
    <Navbar />

    <dir class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <router-view />
        </div>
    </dir>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components:{
        Navbar: defineAsyncComponent(() => import('../components/NavbarItem.vue')),
        EntryList: defineAsyncComponent(() => import('../components/EntryList.vue'))
    }
}
</script>