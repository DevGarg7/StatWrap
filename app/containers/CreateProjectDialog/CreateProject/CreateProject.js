import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FolderIcon from '@material-ui/icons/Folder';
import Constants from '../../../constants/constants';

export default function AddProject(props) {
  return (
    <List>
      <ListItem
        button
        onClick={() => props.onSelect(Constants.NEW_PROJECT_TYPE)}
      >
        <ListItemAvatar>
          <Avatar>
            <NewReleasesIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="New Project"
          secondary="Start a new project in a brand new directory"
        />
      </ListItem>
      <ListItem
        button
        onClick={() => props.onSelect(Constants.EXISTING_PROJECT_TYPE)}
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Existing Directory"
          secondary="Associate a project with an existing directory"
        />
      </ListItem>
    </List>
  );
}
