import React, { FormEvent, FormEventHandler, useState} from 'react'
import { useRouter} from "next/router";
import { toast } from "react-toastify";

type Props = {}

const LoginForm = (props: Props) => {





    const router = useRouter();
    const [pass, setPass] = useState('')

    const handlePass = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
      
      setPass(e.target.value)
   

    }

    const handleSubmit =  async(event: FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const res = await fetch('api/auth',{method:'POST', body: JSON.stringify(pass)})
      if(res.status == 200){
          router.push('/admin')
      }else{
         console.log("error")
      }
    
    }

    const readCookie = (name:string)=> {

        var nameEQ = name + "="; 
        var ca = document.cookie.split(';');
      
        for(var i=0;i < ca.length;i++) {
      
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent( c.substring(nameEQ.length,c.length) );
          }
      
        }
      
        return null;
      
      }

    const handlelogin = async(e: Event)=>{
        e.preventDefault();
        const res = await fetch('api/auth',{method:'POST', body: JSON.stringify(pass)})
        if(res.status == 200){
            router.push({
                pathname:'/admin',
                auth: `${readCookie('authorization')}`
            });
        }else{
           console.log("error")
        }
    }


  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="C.A.Tac.Pol"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Administrador de blibioteca catacpol
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                  Contraseña
                </label>
          
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" pl-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handlePass}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

        
        </div>
      </div>

  
    </div>
  )
}

export default LoginForm