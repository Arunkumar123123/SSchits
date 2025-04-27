import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import bgImage from '../../images/bgImage.png';
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const goBackToPreviousPage = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('public/api/forget/password', { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Error: Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" 
        // style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg overflow-hidden shadow-md px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Forget Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 py-2 px-3 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>

                        <div class="flex justify-end">
                            <button
                                onClick={goBackToPreviousPage}
                                className="mt-4 bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Go back
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
