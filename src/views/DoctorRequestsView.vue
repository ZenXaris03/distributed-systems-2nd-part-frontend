<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { useApplicationStore } from '@/stores/application.js';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const doctorIdRef = ref(null);
const urlRef = computed(() => {
    return 'http://localhost:9090/api/doctor/' +doctorIdRef.value+ '/requests'}
);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

onMounted(() => {
    doctorIdRef.value = route.params.id;
    performRequest();
});

</script>

<template>
    <div>
        <table class="table">
            <thead v-if="data">
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                <p></p>
            </thead>
            <tbody v-if="loading">
                <tr>
                    <td colspan="5">Loading...</td>
                </tr>
            </tbody>
            <tbody v-if="data">
                <tr v-if="Array.isArray(data)"></tr>
                <tr v-for="request in data" :key="request.id">
                    <td>{{ request.id }}</td>
                    <td>{{ request.currentStatus }}</td>
                    <td>
                        <RouterLink
                            :to="{ name: 'request-citizen-details', params: { id: request.id } }" 
                            v-if="request.currentStatus==='unseen'"
                        >Details</RouterLink>
                    </td>             
                </tr>
            </tbody>
            <tbody v-else>
                <div>
                    <p v-if="userRoles.includes('ROLE_DOCTOR')">You don't have any requests yet.</p>
                    <p v-if="userRoles.includes('ROLE_ADMIN')">This doctor doesn't have any requests yet.</p>
                </div>
            </tbody>
        </table>
    </div>
</template>