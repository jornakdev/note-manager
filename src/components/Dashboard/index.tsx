import React, { FC } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Props } from './types';
import { createActionLocaleSet } from '../../reducers/locale/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { selectLocale } from '../../reducers/locale/selectors';
import { messages } from '../../utils/messages';
import { Locales, WithTheme } from '../../utils/types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Assessment {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

// Material UI example dashboard:
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

const StyledAutocomplete: FC<WithTheme> = styled(Autocomplete)`
  .MuiFormLabel-root {
    color: ${(props: WithTheme) => props.theme.palette.primary.contrastText};
  }
  .MuiInputBase-root {
    color: ${(props: WithTheme) => props.theme.palette.primary.contrastText};
  }
  .MuiSvgIcon-root {
    color: ${(props: WithTheme) => props.theme.palette.primary.contrastText};
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${(props: WithTheme) =>
      props.theme.palette.primary.contrastText};
  }
  .MuiInput-underline:before {
    border-color: ${(props: WithTheme) =>
      props.theme.palette.primary.contrastText};
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: ${(props: WithTheme) =>
      props.theme.palette.primary.contrastText};
  }
`;

const Dashboard: FC<Props> = ({ title, MenuItems, Content }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const intl = useIntl();
  const locale = useSelector(selectLocale);
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <StyledAutocomplete
            theme={theme}
            options={Object.keys(Locales)}
            style={{ width: 300 }}
            value={locale}
            disableClearable
            onChange={(event: any, newValue: string | null) => {
              dispatch(createActionLocaleSet(newValue));
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label={intl.formatMessage(messages.language)}
                fullWidth
              />
            )}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MenuItems />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Content />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
