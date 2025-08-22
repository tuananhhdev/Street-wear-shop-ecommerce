import { useUser } from '@/stores/auth-store'

const DashboardPage = () => {
  const user = useUser()
  return (
    <div>
      <h1>Xin chào, {user?.fullName || 'Ẩn danh'}</h1>
    </div>
  )
}

export default DashboardPage
