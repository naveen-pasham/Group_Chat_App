
document.getElementById('forgot').addEventListener('click',()=>{
    forgotpassword(event);
})


    async function forgotpassword(event) {
        try{
        event.preventDefault();
        const email=  document.getElementById('email').value;      
        const obj={
            email
        }
      
         const forgotpassworduserdata=await axios.post('http://54.196.61.25:2000/password/forgotpassword',obj);
         console.log(forgotpassworduserdata);
        }
        catch(error){
         console.log(error);
        }
      } 
