import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios';
import { userStateContext } from '../contexts/ContextProvider';

export default function Signup() {
    const { setCurrentUser, setUserToken } = userStateContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({__html: ''});

    const onSubmit = (event) => {
        event.preventDefault();

        setError({ __html: '' })

        axiosClient.post('auth/register', {
            name,
            email,
            password,
            c_password: confirmPassword
        }).then(({ data }) => {
            setUserToken(data.accessToken)
        }).catch((error) => {
            if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => 
                        [...next, ...accum], []
                );
                console.log(finalErrors)
                setError({__html: finalErrors.join('<br>')})
            }
            console.error(error)
        });
    }

    return (
      <>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

            {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}

            <form onSubmit={onSubmit} method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                    </label>
                    <div className="mt-2">

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="c_password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password Confirmation
                    </label>
                    </div>
                    <div className="mt-2">
                    <input
                        id="c_password"
                        name="c_password"
                        type="password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                </div>
            </form>

            <Link to='/login' className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            </Link>
        </div>
      </>
    )
  }
  