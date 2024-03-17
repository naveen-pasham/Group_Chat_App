 
document.getElementById('login').addEventListener('click',()=>{
  user(event);
})

 
 // add user 
 async function user(event) {
    try{
    event.preventDefault();
    const email=  document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const usesrstatus=document.getElementById('userstatus');
    const obj={
      email,
      password
    }
  
     const logindata=await axios.post('http://54.196.61.25:2000/user/login',obj);
       usesrstatus.innerText=logindata.data.message;
       console.log(logindata);
       if(logindata.data.message==="User Login Sucessfully!!"){
        localStorage.setItem('token', logindata.data.token);
        localStorage.setItem('name', logindata.data.username);
       // window.location.href = "../Dashboard/dashboard.html" 
        window.location.href = "../Chat/chat.html" 
    }
    }
    catch(error){
      console.log(error)
      const usesrstatus=document.getElementById('userstatus');
      usesrstatus.innerText=error.response.data.message;
    }
  }
  document.getElementById('signup').addEventListener('click',()=>{
    window.location.href = "../Signup/signup.html" 
  })

  document.getElementById('forgot').addEventListener('click',()=>{
    window.location.href = "../ForgotPassword/forgotpassword.html" 
  })
