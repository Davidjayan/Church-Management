import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBook,
  cilCalculator,
  cilCalendar,
  cilPen,
  cilPeople,
  cilVideo,
  cilPencil
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Youtube',
    to: '/youtubeid',
    icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Verse',
    to: '/verse-handler',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Accounting',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Insert',
        to: '/accounting-insert',
      },
      {
        component: CNavItem,
        name: 'Edit',
        to: '/accounting-edit',
      },
      {
        component: CNavItem,
        name: 'Fetch',
        to: '/accounting-fetch',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Attendance',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Churchattendance',
        items: [
          {
            name:'Enter attendance',
            component:CNavItem,
            to : '/attendance-church-insert',
            icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
          },
          {
            name:'Previous attendance',
            component:CNavItem,
            to : '/attendance-church-get',
            icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Studentattendance',
        items: [
          {
            name:'Enter attendance',
            component:CNavItem,
            to : '/attendance-student-insert',
            icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
          },
          {
            name:'Previous attendance',
            component:CNavItem,
            to : '/attendance-student-get',
            icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
          },
        ]
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Member',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Insert',
        to: '/form-insert',
      },
      {
        component: CNavItem,
        name: 'Edit',
        to: '/form-edit',
      },
    ],
  },
]

export default _nav
