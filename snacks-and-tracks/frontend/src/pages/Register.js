import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

const Register = () => { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, error, isLoading } = useRegister('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        await register(name, email, password);
    }

    return (
        <form className="w-1/2 mx-auto mt-10" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-2xl font-medium">Register</h2>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
                    Name:
                </label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
                    Email:
                </label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="password">
                    Password:
                </label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <div className="flex items-center justify-center">
                <button
                    disabled={isLoading}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register
                </button>
            {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{error}</div>}
            </div>
        </form>
    )
}

export default Register;
