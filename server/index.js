const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')  

const UserSchema = mongoose.Schema({
    email: String,
    firstName:String,
    lastName:String,
    phoneNumber:Number,
    address:String,
    dob:String,
    updatedAt: {
        type: Date,
        default: Date.now, 
    },
    
})

const UserModel = mongoose.model("usersDetails",UserSchema)

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/webForm")

app.get('/', async (req,res) =>{
    try{
        const users = await UserModel.find({}).sort({updatedAt: -1}).limit(8).exec()
        res.json(users)
    }
   
    catch(err){res.json(err)}
})

app.get('/getUser/:id',async (req,res) =>{
    try{
        const user = await UserModel.findById(req.params.id)
        res.json(user);
    }
    catch (err) { 
        res.json(err)
    }
})

app.get('/viewUser/:id',async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.id)
        res.json(user);
    }
    catch(err){
        res.json(err)
    }
})

app.put('/updateuser/:id', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id, 
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                dob: req.body.dob,
                updatedAt: new Date(),
            },
            { new: true } 
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


app.post("/createUser", async (req, res) => {
    try {
      const { email } = req.body;
       
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
  
      const newUser = await UserModel.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

app.delete('/deleteuser/:id', async(req, res) =>{
    await UserModel.findByIdAndDelete(req.params.id, req.body).exec();
    res.json({message: "deleted"})
})

app.listen(3001, () => {
    console.log('listening on port');
})