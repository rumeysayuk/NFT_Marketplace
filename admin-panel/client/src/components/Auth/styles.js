import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
   },
   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(1),
      },
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%',
      marginTop: theme.spacing(3),
   },
   confirmButton: {
      marginBottom:"1rem",
      margin: theme.spacing(2, 0, 2),
   },
   googleButton: {
      marginTop: theme.spacing(2),
   },
}));