import auth from '@/modules/auth/store';
import journal from "@/modules/daybook/store/journal";
import { createStore } from "vuex";

const store = createStore({
    modules:{
        auth,
        journal
    }
})

export default store