import { io } from "socket.io-client";

const socket=io('http://localhost:2000')

 
document.getElementById('chat').addEventListener('click',()=>{
    chat(event);
  })

//   let messages=[];
  
//   const token=localStorage.getItem('token');
//   const name=localStorage.getItem('nextuser');
//   let messagesdata=JSON.parse(localStorage.getItem('messages'));
//   document.getElementById('nextuser').innerHTML=`${name} Joined`;
//   if(messagesdata.length===0 || messagesdata==='undefined'){
//     messages=[];
//   }else{
//     messages=messagesdata;
//   }
//    // add messages 
//    async function chat(event) {
//       try{
//       event.preventDefault();
//       const message=  document.getElementById('message').value;
     
//       const obj={
//         message
//       }
    
//        const chatdata=await axios.post('http://localhost:2000/chat/message',obj,{ headers: { "Authorization": token } });
//       // let usermessage={id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username};
//        messages.push({id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username});
//        if(messages.length<11){
//           localStorage.setItem('messages',JSON.stringify(messages));
//           showmessageonscreen([messages[messages.length-1]])
//        }else{
//           messages.shift();
//           localStorage.setItem('messages',JSON.stringify(messages));
//        }
//         resetform();
//     }

//      catch(error){
//         console.log(error)
//       }
//     }

//     function showmessageonscreen(data){
//         let ulbody=document.getElementById('listmessages');
//         data.forEach(message => {
//             list='<li>'+message.username+':'+message.message+'</li>'
//             ulbody.insertAdjacentHTML('beforeend', list);
//         });
//     }

//     function resetform(){
//       document.getElementById('message').value=''
//     }

//     window.addEventListener('DOMContentLoaded',async()=>{
//       try{
//         // const messages=await axios.get('http://localhost:2000/chat/getmessages',{ headers: { "Authorization": token } })
//         // console.log(messages);
//         // localStorage.setItem('length',messages.data.length);
//         //console.log(messages[messages.length-1]);
//         if(messagesdata.length>0){
//           showmessageonscreen(messagesdata);
//         }
//       }
//       catch(error){
//         console.log(error)
//       }
//     })

//   setInterval(async() => {
//     try{
//       // const messages=await axios.get('http://localhost:2000/chat/getmessages',{ headers: { "Authorization": token } })
//       //   //console.log(messages);
//       //   const length=localStorage.getItem('length');
//       //   if(messages.data.length>length){
//       //    // console.log(messages.data[length])
//       //     showmessageonscreen([messages.data[length]]);
//       //     localStorage.setItem('length',messages.data.length);
//       //   }
//       const id=messagesdata[messagesdata.length-1].id+1;
//       const newmessages=await axios.get(`http://localhost:2000/chat/getmessages/${id}`,{ headers: { "Authorization": token } })
//      // console.log(newmessages)
//       if(newmessages.data.length===1){
//         showmessageonscreen(newmessages.data);
//       }
//       messagesdata= JSON.parse(localStorage.getItem('messages'));
       
//       }catch(error){
//         console.log(error);
//       }
//   }, 1000);


  


const token=localStorage.getItem('token');
const username=localStorage.getItem('name');
let selectedOptions=[]

document.getElementById('logout').addEventListener('click',()=>{
    window.location.href = "../Login/login.html" 
});

document.getElementById('creategroup').addEventListener('click',()=>{
    creategroup(event);
});


    // add messages 

   async function chat(event) {
      try{
      event.preventDefault();
      const groupid=localStorage.getItem('groupid');
      const message=  document.getElementById('message').value;
     
      const obj={
        message,
        groupid
      }
    
       const chatdata=await axios.post('http://localhost:2000/chat/message',obj,{ headers: { "Authorization": token } });
       console.log(chatdata)
      // let usermessage={id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username};
     //  messages.push({id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username});
     //  if(messages.length<11){
         // localStorage.setItem('messages',JSON.stringify(messages));
       //   showmessageonscreen([messages[messages.length-1]])
      //  }else{
      //     messages.shift();
      //     localStorage.setItem('messages',JSON.stringify(messages));
      //  }
    //  showmessageonscreen([chatdata.data.chat]);

      socket.on("connect",()=>{
        showmessageonscreen([chatdata.data.chat]);
      })
        resetform();
    }

     catch(error){
        console.log(error)
      }
    }

    function showmessageonscreen(data){
        let ulbody=document.getElementById('listmessages');
        data.forEach(message => {
          let date=new Date(message.createdAt)
        //  console.log(date.getHours()+':'+date.getMinutes())
          if(message.username===username){
            list=`<li> <div class="right-msg">  <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${message.username}</div>
              <div class="msg-info-time">${date.getHours()}:${date.getMinutes()}</div>
            </div>
    
            <div class="msg-text">
              ${message.message}
            </div></div>
        
        </div></li>`
            ulbody.insertAdjacentHTML('beforeend', list);
          }else{
            list=`<li><div class="left-msg">  <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${message.username}</div>
              <div class="msg-info-time">${date.getHours()}:${date.getMinutes()}</div>
            </div>
    
            <div class="msg-text">
              ${message.message}
            </div></div>
          </div></li>`
            ulbody.insertAdjacentHTML('beforeend', list);
          }
        });
    }

    function resetform(){
      document.getElementById('message').value=''
    }










async function creategroup(event){
    try{
        event.preventDefault();
    const groupname=  document.getElementById('groupname').value;

    const obj={
        groupname,
        selectedOptions

    }
        const createdgroup=await axios.post('http://localhost:2000/group/addgroup',obj,{ headers: { "Authorization": token } })
       
        showgrouponscreen([createdgroup.data.groupdata]);
      
    }
    catch(error){
        console.log(error);
    }
}



window.addEventListener('DOMContentLoaded', async()=>{
    try{
        // const userdata=await axios.get('http://localhost:2000/user/getusers',{ headers: { "Authorization": token } });
        // console.log(userdata);
        // showuseronscreen(userdata.data);
        const groupdata=await axios.get('http://localhost:2000/usergroups/getgroups',{ headers: { "Authorization": token } });
       // console.log(groupdata);
       
        showgrouponscreen(groupdata.data);
    }
    catch(error){
        console.log(error);
    }
})


// function showuseronscreen(data){
//   document.getElementById('listgroupusers').getElementsByTagName('tbody')[0].innerHTML=''
//     let tableBody =  document.getElementById('listgroupusers').getElementsByTagName('tbody')[0];
//     data.forEach(user => {
//       admin.forEach(useradmin=>{
//         if(useradmin.userId===user.id){
//           document.getElementById('addmembers').innerHTML='Add Members';
//           let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td> Admin</td></tr>';
//           tableBody.insertAdjacentHTML('beforeend', row);
//         }else{
//           let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td><button type="button" class="btn btn-sm btn-success" onclick="makeadmin(this.parentNode.parentNode)">Make Admin</button><button type="button" class="btn btn-sm btn-danger" onclick="removeuser(this.parentNode.parentNode)">Remove</button></td></tr>';
//           tableBody.insertAdjacentHTML('beforeend', row);
//         }
//       })
//     });
// }




function showuseronscreen(data,admin,userid){
  document.getElementById('addmembers').innerHTML='';
  document.getElementById('listgroupusers').getElementsByTagName('tbody')[0].innerHTML='';
    let tableBody =  document.getElementById('listgroupusers').getElementsByTagName('tbody')[0];
   const length=admin.length;
    admin.forEach((useradmin,index)=>{
     // console.log(useradmin)
      if(useradmin.userId==userid){
        admin.splice(index, 1);
        document.getElementById('addmembers').innerHTML=`<div  data-toggle="modal" data-target="#addmemberstogroup" onclick="addmembers()" style=' cursor: pointer;background-color:#c8dccb;'><svg  style='color:green' xmlns="http://www.w3.org/2000/svg" width="80" height="35" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
      </svg>Add Members</div>`;
      }
    })

    if(admin.length<length){
      data.forEach((user,index) => {
        if(user.id==userid){
          let row = '<tr><td hidden>'+user.id+'</td><td>You</td><td> Admin</td></tr>';
          tableBody.insertAdjacentHTML('beforeend', row);
         
          data.splice(index, 1);
        }
      });
     // console.log(data)
      if(admin.length>0){
      admin.forEach(useradmin=>{
        data.forEach((user,index) => {
         if(user.id==useradmin.userId){
          let row = '<tr><td hidden>'+user.id+'</td><td>'+user.username+'</td><td><button type="button" class="btn btn-sm btn-danger" onclick="removeuser(this.parentNode.parentNode)">Remove</button> Admin</td></tr>';
          tableBody.insertAdjacentHTML('beforeend', row);
          data.splice(index, 1);
        }
      });
    });
  }
    data.forEach(user => {
      let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td><button type="button" class="btn btn-sm btn-success" onclick="makeadmin(this.parentNode.parentNode)">Make Admin</button><button type="button" class="btn btn-sm btn-danger" onclick="removeuser(this.parentNode.parentNode)">Remove</button></td></tr>';
      tableBody.insertAdjacentHTML('beforeend', row);
    });

    }else{
      data.forEach((user,index) => {
        if(user.id==userid){
          let row = '<tr><td hidden>'+user.id+'</td><td>You</td><td hidden> </td></tr>';
          tableBody.insertAdjacentHTML('beforeend', row);
          data.splice(index, 1);
        }
      });
      if(admin.length>0){
      admin.forEach(useradmin=>{
        data.forEach((user,index) => {
         if(user.id==useradmin.userId){
          let row = '<tr><td hidden>'+user.id+'</td><td>'+user.username+'</td><td> Admin</td></tr>';
          tableBody.insertAdjacentHTML('beforeend', row);
          data.splice(index, 1);
        }
      });
    });
  }
    data.forEach(user => {
      let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td hidden></td></tr>';
      tableBody.insertAdjacentHTML('beforeend', row);
    });
    }
    
    //   if(useradmin.userId===userid){
    //     data.forEach(user => {
    //   }

    // })


    // data.forEach(user => {
    //   admin.forEach(useradmin=>{
    //     if(useradmin.userId===user.id){
    //       document.getElementById('addmembers').innerHTML='Add Members';
    //       let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td> Admin</td></tr>';
    //       tableBody.insertAdjacentHTML('beforeend', row);
    //     }else{
    //       let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td><button type="button" class="btn btn-sm btn-success" onclick="makeadmin(this.parentNode.parentNode)">Make Admin</button><button type="button" class="btn btn-sm btn-danger" onclick="removeuser(this.parentNode.parentNode)">Remove</button></td></tr>';
    //       tableBody.insertAdjacentHTML('beforeend', row);
    //     }
    //   })
    // });
}



function showgrouponscreen(data){
    let tableBody =  document.getElementById('listgroups').getElementsByTagName('tbody')[0];
    data.forEach(group => {
        let row = '<tr><td hidden>'+group.id+'</td><td id="groupshow" onclick="showdata(this.parentNode)">' + group.name +'</td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}



async function showdata(row){
  document.getElementById('listmessages').innerHTML=''
  document.getElementById('groupcarddata').style.display = "block";
  const id= row.cells[0].innerHTML;
  const messages=await axios.get(`http://localhost:2000/chat/getmessages/${id}`,{ headers: { "Authorization": token } })
 // console.log(messages)
 
 showmessageonscreen(messages.data.message);
 
  localStorage.setItem('groupid',id);
  

  const name=row.cells[1].innerHTML;
  document.getElementById('groupdata').innerHTML='';
    const groupname=document.getElementById('groupdata');
   // console.log(groupname)
    const data=`<div class="row"> <div class="col-md-8 mx-auto" onclick="showgroupusers(${id})"><h3  data-toggle="modal" data-target="#groupinfo">${name}</h3></div><div class="col-md-4 mx-auto"><button type="button" class="btn btn-sm btn-danger" onclick="removegroup(${id})">Exit Group</button></div></div>`;
 groupname.insertAdjacentHTML('beforeend',data);
}

function removegroup(id){

  axios.get(`http://localhost:2000/usergroups/deletegroup/${id}`,{ headers: { "Authorization": token } });
}

async function showgroupusers(id){
  // document.getElementById('namegroup').innerHTML=`${id}`;
  localStorage.removeItem('memberstogroup')
 const groupinfodata=await axios.get(`http://localhost:2000/group/data/${id}`,{ headers: { "Authorization": token } }) 
 document.getElementById('namegroup').innerHTML=groupinfodata.data.group.name;
// console.log(groupinfodata)
 showuseronscreen(groupinfodata.data.userdata,groupinfodata.data.admin,groupinfodata.data.userid)
}

async function makeadmin(row){
  const groupid=localStorage.getItem('groupid');
  const id=row.cells[0].innerHTML;
  axios.post(`http://localhost:2000/admin/makeadmin`,{groupid:groupid,userid:id})
  row.cells[2].innerHTML='<button type="button" class="btn btn-sm btn-danger" onclick="removeuser(this.parentNode.parentNode)">Remove</button>Admin';
}
async function removeuser(row){
  row.parentNode.removeChild(row);
  const groupid=localStorage.getItem('groupid');
  const id=row.cells[0].innerHTML;
  console.log(id)
  axios.get(`http://localhost:2000/usergroups/deleteuser?groupid=${groupid}&userid=${id}`) 
}

async function addmembers(){
  localStorage.removeItem('search');
  let memberstogroup=JSON.parse(localStorage.getItem('memberstogroup'));
  if(memberstogroup==null){
    selectedOptions=[]
  }else if(memberstogroup.length>0){
    selectedOptions=memberstogroup;
  }
  
  document.getElementById('groupmembers').getElementsByTagName('tbody')[0].innerHTML='';
  const groupid=localStorage.getItem('groupid');
  let addmemberstogroup=document.getElementById('groupmembers').getElementsByTagName('tbody')[0];
  const usergroup= await axios.get(`http://localhost:2000/usergroups/getgroup/${groupid}`,{ headers: { "Authorization": token } });
  console.log(usergroup)
 await usergroup.data.users.forEach((user,index)=>{
    if(user.id==usergroup.data.userid){
          usergroup.data.users.splice(index, 1);
    }
  });
 
    await  usergroup.data.usergroups.forEach((groupuser)=>{
        usergroup.data.users.forEach((user,index)=>{
        if(user.id==groupuser.userId){
          let list =`<tr><td hidden>${user.id}</td><td style=' cursor: pointer;'  onMouseOver="this.style.background='#007bff'"  onMouseOut="this.style.background=''"><input value="${user.id}" type="checkbox" checked>${user.username}</td></tr>`
          addmemberstogroup.insertAdjacentHTML('beforeend', list);
          usergroup.data.users.splice(index, 1);
        }
      });
    });

    await  usergroup.data.users.forEach((user,index)=>{
      let list =`<tr><td hidden>${user.id}</td><td style=' cursor: pointer;'  onMouseOver="this.style.background='#007bff'"  onMouseOut="this.style.background=''" onclick="addmembertogroup(this.parentNode)"><input value="${user.id}" type="checkbox">${user.username}</td></tr>`
      addmemberstogroup.insertAdjacentHTML('beforeend', list);
       
    });
    
}


async function addmembertogroup(row){
  console.log(row.cells[0].innerHTML)
  selectedOptions.indexOf(parseInt(row.cells[0].innerHTML))===-1?selectedOptions.push(parseInt(row.cells[0].innerHTML)):console.log("This item already exists");
  console.log('Selected options:', selectedOptions);
  localStorage.setItem('memberstogroup',JSON.stringify(selectedOptions));

}

document.getElementById('adduserstogroup').addEventListener('click',async()=>{
  const groupid=localStorage.getItem('groupid');
  const obj={
    groupid,
    selectedOptions

}
    const createdgroup=await axios.post('http://localhost:2000/group/addmembers',obj,{ headers: { "Authorization": token } })
    showgroupusers(groupid);
})
let myTimer
let input = document.getElementById('search');
input.addEventListener('focus',async()=>{
  // input.focus();
  // input.select();
  try{
 myTimer= setInterval(async() => {
        
          let searchitem=document.getElementById('search').value;
          console.log(searchitem)
          if(searchitem==''){
              addmembers();
             // window.clearInterval(myTimer)
          }
          if(searchitem!='' && searchitem!=localStorage.getItem('search')){
            localStorage.setItem('search',searchitem);
          document.getElementById('groupmembers').getElementsByTagName('tbody')[0].innerHTML='';
          const groupid=localStorage.getItem('groupid');
          let addmemberstogroup=document.getElementById('groupmembers').getElementsByTagName('tbody')[0];
          const usergroup= await axios.get(`http://localhost:2000/usergroups/getsearchdata?groupid=${groupid}&search=${searchitem}`,{ headers: { "Authorization": token } });
          console.log(usergroup)
         await usergroup.data.users.forEach((user,index)=>{
            if(user.id==usergroup.data.userid){
                  usergroup.data.users.splice(index, 1);
            }
          });
         
            await  usergroup.data.usergroups.forEach((groupuser)=>{
                usergroup.data.users.forEach((user,index)=>{
                if(user.id==groupuser.userId){
                  let list =`<tr><td hidden>${user.id}</td><td style=' cursor: pointer;'  onMouseOver="this.style.background='#007bff'"  onMouseOut="this.style.background=''"><input value="${user.id}" type="checkbox" checked>${user.username}</td></tr>`
                  addmemberstogroup.insertAdjacentHTML('beforeend', list);
                  usergroup.data.users.splice(index, 1);
                }
              });
            });
        
            await  usergroup.data.users.forEach((user,index)=>{
              let list =`<tr><td hidden>${user.id}</td><td style=' cursor: pointer;'  onMouseOver="this.style.background='#007bff'"  onMouseOut="this.style.background=''" onclick="addmembertogroup(this.parentNode)"><input value="${user.id}" type="checkbox">${user.username}</td></tr>`
              addmemberstogroup.insertAdjacentHTML('beforeend', list);
               
            });        
        }
      },1000);
    } catch(error){
      console.log(error)
    }

});


input.addEventListener('blur',async()=>{
  window.clearInterval(myTimer)
});

document.getElementById('group').addEventListener('click',()=>{
    showmembers();
})
async function showmembers(){
    selectedOptions=[]
    document.getElementById('members').innerHTML='';
    let selectedbox=document.getElementById('members');
    console.log(selectedbox)
    const userdata=await axios.get('http://localhost:2000/user/getusers',{ headers: { "Authorization": token } });
    userdata.data.forEach(user => {
      console.log(user);
        let option=`<option value="${user.id}">${user.username}</option>`
        selectedbox.insertAdjacentHTML('beforeend', option);
    });
}

document.getElementById('members').addEventListener('change',(event)=>{ 
   let selectedOption = Array.from(event.target.selectedOptions).map(option => option.value);
    selectedOptions.indexOf(parseInt(selectedOption[0]))===-1?selectedOptions.push(parseInt(selectedOption[0])):console.log("This item already exists");
    console.log('Selected options:', selectedOptions);
  
});