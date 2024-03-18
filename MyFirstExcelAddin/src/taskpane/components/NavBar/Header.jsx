import * as React from "react";

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from "@fluentui/react-components";
import { MenuProps } from "@fluentui/react-components";
import menuIcon from "../../../../assets/menu.png";

import { Avatar } from "@fluentui/react-components";
import { PersonCircle28Filled } from "@fluentui/react-icons";


const EditorLayoutSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange  = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Editor Layout</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Split Up</MenuItem>
          <MenuItem>Split Down</MenuItem>
          <MenuItem>Single</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const AppearanceSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Appearance</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Centered Layout</MenuItem>
          <MenuItem>Zen</MenuItem>
          <MenuItem disabled>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};





// 








const Key = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Key StackHolder</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem><a href="#">CIO (Chief Information Officer </a> </MenuItem>
          <MenuItem><a href="#">ICT(Group)</a></MenuItem>
          <MenuItem><a href="#">ICT(Regional/Subsidary)</a></MenuItem>
          <MenuItem><a href="#">Executive ICT Leadership Team</a></MenuItem>
          <MenuItem><a href="#">IT Managers and Directors</a></MenuItem>
          <MenuItem><a href="#">Finacial Manager and Directors(ICT CC Owner)</a></MenuItem>
          <MenuItem><a href="#">Buisness Unit Manager</a></MenuItem>
          <MenuItem><a href="#">Compliance and Risk Managers</a></MenuItem>
          <MenuItem><a href="#">IT HR Partner</a></MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const Buisness = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Buisness Requirment</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
        <MenuItem></MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const UserStories = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>User Stories</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu />
          <EditorLayoutSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const DataModelVisual = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Data Model Visual</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu />
          <EditorLayoutSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const CalcFlowVisual = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Calc Flow Visual</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu />
          <EditorLayoutSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const DataModelMatrix = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Data Model Matrix</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu />
          <EditorLayoutSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};



export const Main = () => {

  const divStyle = {
    color: 'blue',       
    backgroundColor: 'lightgrey',

    border: '1px solid black'
  };
  return (
    <p style={divStyle}>
      Lorem ipsum dolor sit, amet consectetur
    </p>
  );
};
export const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between",  }}>
    <Menu>
      <MenuTrigger >
        <img src={menuIcon} alt="" height="25px" style={{ marginLeft: "10px", marginTop: "10px",cursor: "pointer"}} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <Key />
          <Buisness />
          <UserStories />
          <DataModelVisual />
          <CalcFlowVisual />
          <DataModelMatrix />
        </MenuList>
      </MenuPopover>
    </Menu>
    <Main/>
    <div style={{marginTop:"10px", marginRight: "10px", cursor:"pointer"}}>

    <PersonCircle28Filled/>
    </div>

    </div>
  );
};
