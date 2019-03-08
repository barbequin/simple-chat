import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Divider } from 'semantic-ui-react'
import axios from 'axios';


export default class Avatars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      avatars: [],
      selectedAvatar: null
    }

    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.selectAvatar = this.selectAvatar.bind(this);
    this.saveSelected = this.saveSelected.bind(this);
  }
  /**
   * Fetch available avatars from server and bind to state
   */
  componentWillMount() {
    let apiUrl = process.env.REACT_APP_API_URI;

    axios.get(`${apiUrl}/avatars`).then(result => {
      this.setState({avatars: result.data});
    }).catch(err => {
      console.error(err);
      this.setState({isOpen: false});
    });

  }

  toggleIsOpen() {
    this.setState({isOpen: !this.state.isOpen});
  }

  /**
   * Save selected avatar in state
   */
  selectAvatar(src, e) {
    console.log(src);
    this.setState({selectedAvatar: src});
  }

  /**
   * Save Selected avatar to db
   */
  saveSelected() {
    this.setState({isOpen: false});
  }

  render() {

    let {isOpen, avatars} = this.state;

    return (
      <Modal open={isOpen}>
      <Modal.Header>Select Avatar Image</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            {avatars.slice(0, 80).map(src =>
              <Image className={this.state.selectedAvatar == src ? 'avatar-option selected' : 'avatar-option'} onClick={(e) => this.selectAvatar(src, e)} size='tiny' floated='left' src={src} key={src} />
            )}
        </Modal.Description>
        <Modal.Actions >

          <Button basic color='green' floated="left" onClick={this.saveSelected}>
            <Icon name='checkmark' /> Save
          </Button>

          <Button color='green' floated="left" onClick={this.toggleIsOpen}>
            <Icon name='remove'/> Cancel
          </Button>
        </Modal.Actions>

      </Modal.Content>
    </Modal>
    );
  }


}
