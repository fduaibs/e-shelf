// ul {
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
//   background-color: #333;
// }

// li {
//   float: left;
// }

// li a {
//   display: block;
//   color: white;
//   text-align: center;
//   padding: 14px 16px;
//   text-decoration: none;
// }

// /* Change the link color to #111 (black) on hover */
// li a:hover {
//   background-color: #111;
// }

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    flexGrow: 1,
  },
  logoStyle: {
    maxHeight: '56px',
  },
  middleDivStyle: {
    flexGrow: 1
  },
  toolbarStyle: {
    minHeight: '64px',
    maxHeight: '64px',
  },
  profileIconStyle: {
    marginLeft: theme.spacing(1),
  }
}));

export default useStyles;