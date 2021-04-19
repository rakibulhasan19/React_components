import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const List = ({list,editData,deleteData})=>{

    if (list){
        return (list.map((row,index)=>(
            <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="justify">{row.firstname}</TableCell>
                <TableCell align="justify">{row.lastname}</TableCell>
                <TableCell align="justify">
                    <Button onClick={()=>editData(row.id,index)}><EditIcon/></Button>
                </TableCell>
                <TableCell align="justify">
                    <Button onClick={()=>deleteData(row.id)}><DeleteIcon/></Button>
                </TableCell>
            </TableRow>
        ))
        )
    }
    else {
        return <TableCell>Data not found !</TableCell>
    }

}
export default List;