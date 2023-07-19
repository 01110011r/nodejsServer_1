 const http=require('http');
 const fs=require('fs');
 const path=require('path');
//  const { stringify } = require('querystring');
 const server=http.createServer((req,res)=>{
     let data=JSON.parse(fs.readFileSync(path. join(__dirname, "users.json")));
     const task=JSON.parse(fs.readFileSync(path.join(__dirname, 'task.json')))
     if(req.method == 'GET') {
         console.log(path.join(__dirname, "users.json"));
         console.log(data);
         console.log(task);
         if(req.url=='/users'){
      data=data.map((user)=>{
             for(let i=0; i<task.length; i++){
  if(task[i].user_id==user.id)user.task=task[i];
             }
 return user;
         })
             return res.end(JSON.stringify(data))
         }
         if(req.url=='/task'){
             return res.end(JSON.stringify(task))
         }
         return res.end(JSON.stringify('port: 7000'))
     }
     if(req.method=='POST'){
         if(req.url=='/users'){
             let data='';
             req.on('data', (chunk)=>data+=chunk);
             req.on('end',  ()=>{
                 data=JSON.parse(data);
                 const users=JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
               data.id=users.at(-1).id ? users.at(-1).id+1 : users.length+1;
                if(users.every((obj)=>obj.name!==data.name))users.push(data);
               fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2))  
             res.writeHead(201, {"Content-Type": 'aplication/json'});
             // res.write(JSON.stringify(data));
             res.end(JSON.stringify(users));
             })
         }
         if(req.url=='/task'){
            let taskData='';
            req.on('data',(chunk)=>taskData+=chunk);
            req.on('end', ()=>{
                taskData=JSON.parse(taskData);
                const task=JSON.parse(fs.readFileSync(path.join(__dirname, 'task.json'), 'utf-8'));
                taskData.id=task.at(-1).id ? task.at(-1).id+1 : task.length+1;
                if(task.every(t=>t.user_id!==taskData.user_id))task.push(taskData);
                fs.writeFileSync(path.join(__dirname, 'task.json'), JSON.stringify(task, null, 3));
                res.end(JSON.stringify(task))
            })
         }
         // if(req.url)
         // return res.end("POST")
     }
     // return res.end("ok")
 });
 server.listen(7000, console.log('7000 ok'));


