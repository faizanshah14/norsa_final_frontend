import React from 'react';
import '../style/table.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ActionButtons from './ActionButtons';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SideBar from '../Components/sidebar';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonAppBar from './titleheading';
import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'grey',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },

});

export default function ClientTables(props) {

    const theme = useTheme();
    const classes = useStyles();

    const matches = useMediaQuery(theme.breakpoints.down('sm'));


    return (


        <TableContainer component={Paper}>

            <ButtonAppBar heading={props.title} />
            <ActionButtons url={props.url} />
            <Table className={classes.table} aria-label="customized table">
                <TableHead className='asad'>
                    <TableRow>
                        <StyledTableCell>Name </StyledTableCell>
                        <StyledTableCell align="right">Calories</StyledTableCell>
                        <StyledTableCell align="right">Fat&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Carbs&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Protein&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Actions&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <Link to={props.url}> <StyledTableCell align="right"> <Button className="edittable" variant="outlined" color="primary" size="small">
                                <EditIcon className="editIcon" size="small" />
                            </Button></StyledTableCell></Link>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
