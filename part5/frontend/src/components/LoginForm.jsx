const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return(
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm