/* eslint-disable react/prop-types */
import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFolder,
  faTag,
  faThumbtack,
  faEllipsisH,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import Messages from '../constants/messages';
import routes from '../constants/routes.json';
import UserContext from '../components/User/User';
import styles from './App.css';

// This is where we register all of our font-awesome icons that are used throughout the app.
// See https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
library.add(faFolder, faTag, faThumbtack, faEllipsisH, faTrashAlt);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: 'StatWrap' };

    this.handleLoadSystemInfoResponse = this.handleLoadSystemInfoResponse.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send(Messages.LOAD_SYSTEM_INFO_REQUEST);
    ipcRenderer.on(Messages.LOAD_SYSTEM_INFO_RESPONSE, this.handleLoadSystemInfoResponse);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(
      Messages.LOAD_SYSTEM_INFO_RESPONSE,
      this.handleLoadSystemInfoResponse
    );
  }

  handleLoadSystemInfoResponse(sender, response) {
    console.log(response);
    this.setState({ user: response.user });
  }

  render() {
    const { children } = this.props;
    const theme = createMuiTheme({
      palette: {
        type: 'light'
      },
      typography: {
        fontSize: 12
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={this.state.user}>
          <AppBar position="static">
            <Toolbar>
              <Link to={routes.HOME} className={styles.title}>
                <Typography variant="h6">StatWrap</Typography>
              </Link>
              <section className={styles.rightToolbar}>
                <div className={styles.user}>{this.state.user}</div>
                <Link to={routes.SEARCH}>
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Link>
                <Link to={routes.CONFIGURATION}>
                  <IconButton aria-label="settings">
                    <SettingsIcon />
                  </IconButton>
                </Link>
              </section>
            </Toolbar>
          </AppBar>
          {children}
        </UserContext.Provider>
      </ThemeProvider>
    );
  }
}
