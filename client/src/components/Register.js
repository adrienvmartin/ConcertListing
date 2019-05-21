import React, { Fragment, useState } from 'react'

const Register = () => {
  const { formData, setFormData } = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  return (
    <Fragment>
      <h1 className='large-text-primary'>Sign Up</h1>
    </Fragment>
  )
}
