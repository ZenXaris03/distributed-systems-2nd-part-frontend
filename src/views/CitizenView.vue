<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();
const router = useRouter();

const citizenIdRef = ref(null);

onMounted(() => {
    citizenIdRef.value = route.params.id;
    router.push({ name: 'citizen-details'});
});

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

</script>


<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Citizen #{{ citizenIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'citizen-details', params: { id : citizenIdRef } }"
                                >Details</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'citizen-family', params: { id : citizenIdRef } }"
                                >Family Members</RouterLink>
                            </li>
                            <li class="nav-item" v-if="!userRoles.includes('ROLE_DOCTOR')">
                                <RouterLink 
                                    class="nav-link"
                                    :to="{ name: 'family-doctor', params: { id : citizenIdRef } }"
                                >Family Doctor</RouterLink>
                            </li>
                            <li class="nav-item" v-if="!userRoles.includes('ROLE_DOCTOR')">
                                <RouterLink 
                                    class="nav-link"
                                    :to="{ name: 'citizen-request', params: { id : citizenIdRef } }"
                                >Request</RouterLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>