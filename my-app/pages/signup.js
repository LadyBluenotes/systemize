import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import connect from '../api-lib/mongodb'

const Signup = () => {

  connect

  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 200) {
        Router.push('/login')
      } else {
        throw new Error(await res.text())
      }

    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }

  }

  return (
    <Layout>
      <div className="login">
        <Form 
          isLogin={false} 
          errorMessage={errorMsg} 
          onSubmit={handleSubmit} />
      </div>
    </Layout>
  )
}

export default Signup
