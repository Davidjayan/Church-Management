import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Editaccounting = React.lazy(()=> import('./views/Components/Sub Components/Editaccounting'))
const FetchAccounting = React.lazy(()=> import('./views/Components/Sub Components/Fetchaccountingdetails')) 
const InsertAccounting = React.lazy(()=> import('./views/Components/Accounting')) 
const InputChurchAttendance = React.lazy(()=> import('./views/Components/Sub Components/Inputchurchattendance'))
const GetChurchAttendance = React.lazy(()=> import('./views/Components/Sub Components/Getchurchattendance'))
const InputStudentAttendance = React.lazy(()=> import('./views/Components/Sub Components/Inputstudentattendance'))
const GetStudentAttendance = React.lazy(()=> import('./views/Components/Sub Components/Getstudentattendance'))  
const InsertForm = React.lazy(()=> import('./views/Components/Dataentry')) 
const EditForm = React.lazy(()=> import('./views/Components/EditData'))  
const YoutubeID = React.lazy(()=>import('./views/Components/YoutubeID'))
const FileUpload = React.lazy(()=>import('./views/Components/Fileupload'))
const Events = React.lazy(()=>import('./views/Components/Event'))
const Verse = React.lazy(()=>import('./views/Components/Verse'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/accounting-edit', name: 'Edit', component: Editaccounting },
  { path: '/accounting-fetch', name: 'Fetch', component: FetchAccounting },
  { path: '/accounting-insert', name: 'Insert', component: InsertAccounting },
  { path: '/attendance-church-insert', name: 'Church Attendance', component: InputChurchAttendance },
  { path: '/attendance-church-get', name: 'Church Attendance', component: GetChurchAttendance },
  { path: '/attendance-student-insert', name: 'Student Attendance', component: InputStudentAttendance },
  { path: '/attendance-student-get', name: 'Student Attendance', component: GetStudentAttendance },
  { path: '/form-insert', name: 'Member Form', component: InsertForm },
  { path: '/form-edit', name: 'Member Details', component: EditForm },
  { path: '/image-upload', name: 'Files', component: FileUpload },
  { path: '/events', name: 'Event', component: Events },
  { path: '/youtubeid', name: 'Youtube', component: YoutubeID },
  { path: '/verse-handler', name: 'Verse', component: Verse },
]

export default routes
