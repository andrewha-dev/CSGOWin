import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LoginButton from './nav/login/loginButton';
import UserMenu from './nav/userMenu/userMenu'
import  { Context } from '../../store/store';
import './app.css'



const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: 'black'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const isAuthorizedAPI = process.env.REACT_APP_API_URL + '/auth/isAuthenticated';

  const [state, dispatch] = React.useContext(Context);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleLoadingFinished = () => {
    setLoading(false);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkSignIn = () => {
    let authToken = localStorage.getItem('authToken');
    fetch(isAuthorizedAPI, {
      method: 'GET',
      headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
      }
  }).then(response => {
    if (response.ok) {
      response.json().then(jsonVal=> {
        handleLoadingFinished()
        console.log(jsonVal);
        if (jsonVal['user']) {
          dispatch({type: 'LOGIN', payload: jsonVal['user']})
        }
      })
    }
  }).catch(err => {
    console.log(err);
  })
  }

  useEffect(() => {
    let authToken = localStorage.getItem('authToken');
    fetch(isAuthorizedAPI, {
      method: 'GET',
      headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
      }
  }).then(response => {
    if (response.ok) {
      response.json().then(jsonVal=> {
        handleLoadingFinished()
        if (jsonVal['user']) {
          dispatch({type: 'LOGIN', payload: jsonVal['user']})
        }
      })
    }
  }).catch(err => {
    console.log(err);
  });}, []);

  const Profile = () => {
    if (!loading) {
      if (state.user)
        return <UserMenu/>
      else
        return <LoginButton view={checkSignIn.bind(this)}/>
    }
    else
      return null;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={'topNavDiv'}>
            <div className={'logoText'}>
              <Typography variant="h6" noWrap>
                CSGOWin
              </Typography>
            </div>
            <div className={'profileFloat'}>
              <Profile/>
              
              
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div className={'drawerContainer'}>
      <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Roulette', 'Coin Flip'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Marketplace', 'Case Openings'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
      </div>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
