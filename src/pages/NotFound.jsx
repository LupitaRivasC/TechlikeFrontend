import { Navigate } from "react-router-dom"

function NotFound() {
  return (
    <Navigate to='/principal' replace/>
  )
}

export default NotFound
