import {records, screening, user, apps} from '../assets'

export const navLinks=[
    {
        name:'Dashboard',
        imageUrl:apps,
        link:'/'
    },
    {
        name:'Records',
        imageUrl:records,
        link:'/medical-records'
    },
    {
        name:'Screening',
        imageUrl:screening,
        link:'/screening-schedules'
    },
    {
        name:'Profile',
        imageUrl:user,
        link:'/profile'
    }

]