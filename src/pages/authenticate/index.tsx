import React, { ChangeEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

interface authFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
//ovewrite the elements prop of HTMLForm Element to specify exactly what elements are allowed in the form
interface authForm extends HTMLFormElement {
  readonly elements: authFormElements
}

interface authElements {
  email: string
  password: string
}

const Authenticate = () => {
  const router = useRouter();
  /** Handle form events */
  const [formData, setFormData] = React.useState<authElements>({ email: 'test@email.dev', password: 'test1234' })
  const handleFormChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }
  const handleSubmit = (event: React.FormEvent<authForm>) => {
    event.preventDefault()
    setFormData({ email: '', password: '' })
    setTimeout(() => router.replace('/users'), 1000);
  }
  return (
    <div className="flex flex-col justify-center min-h-[100vh]">
      <div className="flex flex-col items-center, justify-center h-full text-secondary">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-10">
            <div className="w-[300px] h-[100px]">
              <Image src="/whoget_green.png" alt="whoget logo" width={600} height={200} />
            </div>
            <div className="">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3 items-end">
                <input type="email" required name='email' value={formData.email} onChange={handleFormChange} placeholder='Email' autoComplete='off' className="outline-none placeholder-secondary placeholder-opacity-50 ring-1 ring-secondary px-3 py-1 rounded-md" />
                <input type="password" required name='password' value={formData.password} onChange={handleFormChange} placeholder="Password" autoComplete='off' className="outline-none placeholder-secondary placeholder-opacity-50 ring-1 ring-secondary px-3 py-1 rounded-md" />
                <p className="text-tertiary opacity-80 text-xs">Forgot password?</p>
                <button className="bg-primary py-2 w-full rounded-full text-white self-center hover:opacity-70 duration-200">LOG IN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authenticate
