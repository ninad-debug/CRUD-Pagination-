import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import '../App.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
    }
  });

  

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data) => {
    localStorage.setItem('username', data?.username)
    navigate("/");
  }

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  return (
    <div>
      <h1>Please Login First !!!</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className="form-control">
          <label>Enter your Username</label>
          <input 
            type="text" 
            id="username"
            {...register("username", {
              required : "Username is Required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
              },
              maxLength: {
                value: 10,
                message: "Username cannot exceed 20 characters"
              }
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <button>Submit</button>
        <DevTool control={control}/>
      </form>
    </div>
  )
}

export default SignInPage