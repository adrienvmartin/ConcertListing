import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/event';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TableContainer,
  Paper,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

const headCells = [
  { id: 'bands', numeric: false, disablePadding: true, label: 'Bands' },
  {
    id: 'venue',
    numeric: false,
    disablePadding: false,
    label: 'Venue'
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City'
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: ''
  }
];

const EnhancedTableHead = props => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map(h => (
          <TableCell
            key={h.id}
            padding={h.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === h.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === h.id}
              direction={orderBy === h.id ? order : 'asc'}
              onClick={createSortHandler(h.id)}
            >
              {h.label}
              {orderBy === h.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

EnhancedTableHead.defaultProps = {
  classes: {},
  onRequestSort: () => {},
  order: 'asc',
  orderBy: 'name',
  rowCount: '25'
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750,
    margin: 10
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const ListingsTable = ({ data, deleteEvent }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const rows = [];

  data.forEach(d => {
    rows.push({
      id: d._id,
      headliner: d.bands.headliner,
      openers: d.bands.openers,
      city: d.city,
      venue: d.venue,
      date: d.date
    });
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <br />
      <Paper className={classes.paper}>
        <h1>Your Events</h1>
        <TableContainer>
          <Table className={classes.table} size="medium">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow hover key={row.id}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <b>{row.headliner}</b> w/ {row.openers}
                      </TableCell>
                      <TableCell>{row.venue}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>
                        {moment(row.date).format('MMMM Do, YYYY')}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => deleteEvent(row.id)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

ListingsTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteEvent }
)(ListingsTable);
