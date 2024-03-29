import { createRouter, createWebHistory } from 'vue-router'
import { useApplicationStore } from '@/stores/application.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/citizens',
      name: 'citizens',
      component: () => import('../views/CitizensView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen/new',
      name: 'citizen-new',
      component: () => import('../views/CreateCitizenView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen/:id',
      name: 'citizen',
      component: () => import('../views/CitizenView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'citizen-details',
          component: () => import('../views/CitizenDetailsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'family',
          name: 'citizen-family',
          component: () => import('../views/CitizenFamilyView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'new/family/member',
          name: 'family-member-new',
          component: () => import('../views/CreateFamilyMemberView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'new/appointment',
          name: 'new-appointment',
          component: () => import('../views/CreateAppointmentView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'member/appointment',
          name: 'member-appointment',
          component: () => import('../views/CitizenAppointmentView.vue'),
          meta: { requiresAuth: true} 
        },
        {
          path: 'doctor',
          name: 'family-doctor',
          component: () => import('../views/CitizenFamilyDoctorView.vue'),
          meta: {requiresAuth: true }
        },
        {
          path: 'doctor/remove',
          name: 'doctor-remove',
          component: () => import('../views/FamilyDoctorRemoveView.vue'),
          meta: {requiresAuth: true }
        },
        {
          path: 'find/doctor',
          name: 'find-doctor',
          component: () => import('../views/FindADoctorView.vue'),
          meta: { requiresAuth: true}
        },
        {
          path: 'find/doctor/details',
          name: 'find-doctor-details',
          component: () => import('../views/FindADoctorDetailsView.vue'),
          meta: { requiresAuth: true}
        },
        {
          path: 'request/confirm',
          name: 'confirm-request',
          component: () => import('../views/ConfirmRequestView.vue'),
          meta: {requiresAuth :true}
        },
        {
          path: 'request/cancel',
          name: 'delete-request',
          component: () => import('../views/CancelRequestView.vue'),
          meta: {requiresAuth :true}
        },
        {
          path: 'request',
          name: 'citizen-request',
          component: () => import('../views/CitizenRequestView.vue'),
          meta: { requiresAuth: true}
        },
        {
          path: '',
          name: 'request-doctor-details',
          component: () => import('../views/RequestDoctorDetailsView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('../views/DoctorsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/doctor/new',
      name: 'doctor-new',
      component: () => import('../views/CreateDoctorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/doctor/:id',
      name: 'doctor',
      component: () => import('../views/DoctorView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'doctor-details',
          component: () => import('../views/DoctorDetailsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'requests',
          name: 'doctor-requests',
          component: () => import('../views/DoctorRequestsView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '',
          name: 'request-citizen-details',
          component: () => import('../views/RequestCitizenDetailsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'answer-request',
          name: 'request-answer',
          component: () => import('../views/RequestAnswerView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'appointments',
          name: 'doctor-appointments',
          component: () => import('../views/DoctorAppointmentsView.vue'),
          meta: { requiresAuth: true}
        },
        {
          path: 'appointment/details',
          name: 'doctor-appointment-details',
          component: () => import('../views/DoctorAppointmentDetailsView.vue'),
          meta: { requiresAuth: true}
        },
        {
          path: 'citizens',
          name: 'doctor-citizens',
          component: () => import('../views/DoctorCitizensView.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'doctor-citizen-details',
              component: () => import('../views/CitizenDetailsView.vue'),
              meta: { requiresAuth: true }
            }
          ]
        },
        {
          path: 'citizen/remove',
          name: 'citizen-remove',
          component: () => import('../views/DoctorCitizenRemoveView.vue'),
          meta: { requiresAuth: true}
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useApplicationStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    console.log('user not authenticated. redirecting to /login')
    next('/login')
  } else {
    next()
  }
})

export default router
