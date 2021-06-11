interface LogoutProps {
  setAuthenticated: (authenticated: boolean) => void
}

export const Logout: React.FC<LogoutProps> = ({ setAuthenticated }) => {
  return (
    <div className="logout">
      <h1> Logout</h1>

    </div>
  )
}