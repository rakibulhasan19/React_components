import React,{useState} from 'react'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuid } from 'uuid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import List from "./list";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
     withoutLabel: {
      marginTop: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(1),
    },
    
    
    
  },
}));

function App() {
  const classes = useStyles();
  const [values,setValues] = useState([
    {id:uuid().toString(),firstname:'',lastname:''}
  ])
  const [list,setList] = useState(null)
  const [edit,setEdit]  = useState(false)


  const onChangeHandler =(index,event)=>{
    const valuesData = [...values]
    valuesData[index][event.target.name] = event.target.value
    setValues(valuesData)
  }

  const onSubmitHandler =(event)=>{
   event.preventDefault()
    setList(values)
    event.target.reset()
    setEdit(false)
  }


  const addedInputField =()=>{
    setValues([...values, {id:uuid().toString(),firstname:'',lastname:''}])
  }
  const removeInputField =(id)=>{
    let remove = [...values].filter(item=>item.id !== id)
    setValues(remove)
  }

  const getEditId = (id)=>{
    const data = list.find(item=>item.id === id)
    return data;
  }
  const editData=(id,index)=>{
    const tempData = [...list]
    const idx= tempData.indexOf(getEditId(id))
    const selected = tempData[idx]
    setEdit(true)
    setValues([
          {
            id:selected['id'],
            firstname: selected['firstname'],
            lastname: selected['lastname']
          }
        ]
    )

  }
  const deleteData =(id)=>{
    const deleteId =list.filter(item =>item.id !== id);
    setList(deleteId)




  }
  return (
    <Container>
       <form className={classes.root} onSubmit={onSubmitHandler} autoComplete="off">
         { values.map((inputField,index)=>{
            return <div key={index} >
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                placeholder="First Name"
                className=""
                name="firstname"
                value={[inputField.firstname][index]}
                onChange={(event)=>onChangeHandler(index,event)}
                />
                <TextField
                name="lastname"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                placeholder="Last Name"
                className=""
                value={[inputField.lastname][index]}
                onChange={(event)=>onChangeHandler(index,event)}
                />
                <Button onClick={()=>removeInputField(inputField.id)}>
                  <RemoveIcon/>
                </Button>
                <Button onClick={addedInputField}>
                  <AddIcon/>
                </Button>
            </div>

         }
       )
     }
        <Button type="submit"  variant="contained" color="primary">
          {edit ? 'Edit' : 'Save'}
          <SendIcon/></Button>
        </form>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="justify">ID</TableCell>
            <TableCell align="justify">FIRSTNAME</TableCell>
            <TableCell align="justify">LASTNAME</TableCell>
            <TableCell align="justify">EDIT</TableCell>
            <TableCell align="justify">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         <List
             list={list}
             editData={editData}
             deleteData={deleteData}
         />
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
     
  );
}

export default App;
