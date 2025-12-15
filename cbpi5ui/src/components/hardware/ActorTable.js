// Use `sx` prop instead of makeStyles
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CBPiContext } from '../data';
import { actorapi } from '../data/actorapi';
import ActorButton from '../util/ActorButton';
import ActorSwitch from '../util/ActorSwitch';
import DeleteDialog from '../util/DeleteDialog';


const ActorTable = () => {
    const tableSx = { minWidth: 650 };
    const history = useHistory();
    const { state, actions } = useContext(CBPiContext);

    
    
    const remove_callback = (id) => {
        actorapi.remove(id)
        actions.delete_actor(id)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={tableSx} dense={true} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right" className="hidden-xs">Type</TableCell>
                            <TableCell align="right" className="hidden-xs">GPIO</TableCell>
                            <TableCell align="right" className="hidden-xs">State</TableCell>
                            <TableCell align="right" className="hidden-xs">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.actors.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    
                                        {row.name}
                                
                                </TableCell>
                                <TableCell align="right" className="hidden-xs">{row.type}</TableCell>
                                <TableCell align="right" className="hidden-xs">{row.props["GPIO"]}</TableCell>
                                <TableCell align="right" className="hidden-xs"><ActorSwitch id={row.id}/></TableCell>
                                <TableCell align="right" className="hidden-xs">
                                    <DeleteDialog title="Delete Actor" message="Do you want to delete the Actor" id={row.id} callback={remove_callback} />
                                    <IconButton aria-label="delete" size="small" onClick={() => { history.push("/actor/"+row.id) }} >
                                      <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default  ActorTable