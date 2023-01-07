import Link from 'next/link'

const Form = ({ isLogin, errorMessage, onSubmit }) => {
  
  return (
      <form onSubmit={onSubmit}>
      <label>
        <span>Username</span>
        <input type="text" name="username" required />
      </label>
      <label>
        <span>Password</span>
        <input type="password" name="password" required />
      </label>

      <div className="submit">
        {isLogin ? (
          <>
            <Link href="/signup" legacyBehavior>
              <a>I don't have an account</a>
            </Link>
            <button type="submit">Login</button>
          </>
        ) : (
          <>
            <Link href="/login" legacyBehavior>
              <a>I already have an account</a>
            </Link>
            <button type="submit">Sign Up</button>
          </>
        )}
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

    </form>
  )
}

export default Form
