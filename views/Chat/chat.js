 
document.getElementById('chat').addEventListener('click',()=>{
    chat(event);
  })
  
  const token=localStorage.getItem('token');
   // add messages 
   async function chat(event) {
      try{
      event.preventDefault();
      const message=  document.getElementById('message').value;
     
      const obj={
        message
      }
    
       const chatdata=await axios.post('http://localhost:2000/chat/message',obj,{ headers: { "Authorization": token } });
      //  showmessageonscreen(chatdata.data)
    
    }

     catch(error){
        console.log(error)
      }
    }

    // function showmessageonscreen(data){
    //     let ulbody=document.getElementById('listmessages')[0];
    //     const name=localStorage.getItem('name');
    //     let list='<li>You Joined</li><li>'+name+'Joined</li>'
    //     data.forEach(message => {
    //         list='<li>'+message.name+':'+message.message+'</li>'
    //     });
    //     ulbody.insertAdjacentHTML('beforeend', list);
    // }