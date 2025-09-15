// import React, { useState } from 'react'
// import AlertError from '../../components/common/Alert/alertError.common'
// import AlertSuccess from '../../components/common/Alert/alertSuccess.commo,'
// import Navbar from '../../components/common/Navbar/navbar.common'
// // import authService from '../../services/auth.service'

// const LostPassword: React.FC = () => {
//   // State hooks for form fields, loading state, and error/success messages
//   const [isLoading, setIsLoading] = useState(false)
//   const [email, setEmail] = useState('')
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)

//   // Handle form submission
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     setIsLoading(true)
//     setError(null)
//     setSuccess(null)
//     // try {
//     //   const { message } = await authService.resetPassword(email)
//     //   setSuccess(message)
//     // } catch (error: any) {
//     //   setError('An error occurred. Please try again.')
//     // } finally {
//     //   setIsLoading(false)
//     // }
//   }
//   return (
//     <>
//       <Navbar />
//       {error && (
//         <div className="fixed top-4 right-4 z-50">
//           <AlertError message={error} onClose={() => setError(null)} description={''} />
//         </div>
//       )}
//       {success && (
//         <div className="fixed top-4 right-4 z-50">
//           <AlertSuccess message={success} onClose={() => setSuccess(null)} />
//         </div>
//       )}
//       <div className="antialiased bg-gray-100">
//         <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-md">
//           <h1 className="text-4xl font-medium">Reset Password</h1>
//           <p className="text-gray-500">Fill up the form to reset your password</p>
//           <form className="my-10" onSubmit={handleSubmit}>
//             <div className="flex flex-col space-y-5">
//               <label htmlFor="email" className="block">
//                 <p className="font-medium text-gray-700 pb-2">Email Address</p>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 hover:shadow"
//                   placeholder="Enter email address"
//                   required
//                 />
//               </label>
//               <button
//                 type="submit"
//                 className={`w-full py-3 font-medium text-white rounded-lg inline-flex items-center justify-center ${
//                   isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
//                 }`}
//                 disabled={isLoading}
//               >
//                 {isLoading
//                   ? (
//                   <>
//                     <svg
//                       className="animate-spin w-5 h-5 mr-3"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.96 7.96 0 0116 12h4zm-6 7.709V24c4.418 0 8-3.582 8-8h-4c0 2.967-1.175 5.677-3.093 7.709z"
//                       ></path>
//                     </svg>
//                     <span>Loading...</span>
//                   </>
//                     )
//                   : (
//                   <>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
//                       />
//                     </svg>
//                     <span>Reset Password</span>
//                   </>
//                     )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }
// export default LostPassword