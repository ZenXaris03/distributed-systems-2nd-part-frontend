<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();
const doctorIdRef = ref(null);

const urlRef = computed(() => {
    return 'http://localhost:9090/api/doctor/' + doctorIdRef.value;
});

const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

const applicationStore = useApplicationStore();
const userRoles = computed(()=> applicationStore.isAuthenticated ? applicationStore.userData.roles : []);

onMounted(() => {
    doctorIdRef.value = route.params.id;
    performRequest();
});

const router = useRouter();

const onSubmit = () => {
    router.push({ name: 'confirm-request' });
};
</script>


<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Field Name</th>
                    <th>Field Value</th>
                </tr>
                <p></p>
            </thead>
            <tbody v-if="loading">
                <tr>
                    <td colspan="2">Loading...</td>
                </tr>
            </tbody>
            <tbody v-if="data">
                <tr>
                    <th>Full Name</th>
                    <td>{{ data.fullName }}</td>
                </tr>
                <tr>
                    <th>Username</th>
                    <td>{{ data.username }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ data.email }}</td>
                </tr>
                <tr>
                    <th>Phone number</th>
                    <td>{{ data.phoneNumber }}</td>
                </tr>
                <tr>
                    <th>Department</th>
                    <td>{{ data.department }}</td>
                </tr>
                <tr>
                    <th>Prefecture</th>
                    <td>{{ data.prefecture }}</td>
                </tr>
                <tr>
                    <th>Specialty</th>
                    <td>{{ data.specialty }}</td>
                </tr>
                <tr>
                    <th>Office Address</th>
                    <td>{{ data.doctorOfficeAddress }}</td>
                </tr>
                <tr>
                    <th>Rating</th>
                    <td>{{ data.rating }}</td>
                </tr>
                <tr>
                    <th>Appointments Completed</th>
                    <td>{{ data.appointmentsCompleted }}</td>
                </tr>
                <tr>
                    <th>Maximum Number Of Citizens (as a family doctor)</th>
                    <td>{{ data.maxNumberOfCitizens }}</td>
                </tr>
            </tbody>
        </table>
        <button v-if="userRoles.includes('ROLE_CITIZEN')" @click="onSubmit" type="submit" class="btn btn-primary">Send request</button>
    </div>
</template>