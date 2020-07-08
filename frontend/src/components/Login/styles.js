import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ContainerStyle: {
    marginTop: '1rem',
    justifyContent: 'center',
  },
  FormStyle: {
    '& > *': {
      marginTop: '1rem',
    }
  },
  LinkStyle: {
    '&:hover': {
      textDecoration: 'none',
    },
    '& .MuiTypography-root': {
      marginTop: '1rem',
      alignItems: 'center',
      fontWeight: 500,
      transition: 'opacity 0.2s',
      '&:hover': {
        opacity: '80%'
      },
      '& svg': {
        marginRight: '8px',
        verticalAlign: '-4px'
      },
    }
  },
});

export default useStyles;