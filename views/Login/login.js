 
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
  
     const logindata=await axios.post('http://localhost:2000/user/login',obj);
       usesrstatus.innerText=logindata.data.message;
      
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
