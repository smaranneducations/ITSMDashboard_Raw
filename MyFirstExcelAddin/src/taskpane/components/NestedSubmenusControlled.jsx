import * as React from "react";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from "@fluentui/react-components";
import { HashRouter, Link } from "react-router-dom";

const EPMEcosystemSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement={true}>
        <MenuItem>EPMEcosystem</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        <MenuItem> Inbound systems </MenuItem>
        <MenuItem> Outbound Systems </MenuItem>
        <MenuItem> Reconciliation systems </MenuItem>
        <MenuItem> DR & Performance </MenuItem>
        <MenuItem> References </MenuItem>
        <MenuItem> Notes </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};


const SecuritySubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement={true}>
        <MenuItem>Security</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        <MenuItem> Setup </MenuItem>
        <MenuItem> Data Audit </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const ReportsSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement={true}>
        <MenuItem>Reports</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        <MenuItem> Standdard Reports </MenuItem>
        <MenuItem> Recharge reports </MenuItem>
        <MenuItem> Validation Reports </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const FormsSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement={true}>
        <MenuItem>Forms</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        <MenuItem> Form_FXRates (Reference Data) </MenuItem>
        <MenuItem> Form_EMP_Wages_Rate </MenuItem>
        <MenuItem> Form_User_By_Entity </MenuItem>
        <MenuItem> Form_BY_App </MenuItem>
        <MenuItem> Form_FinancialData </MenuItem>
        <MenuItem> Form_LabourAllocation </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const MasterDataSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement={true}>
        <MenuItem>MasterData</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        <Link to="/Scenario" style={{ textDecoration: "none" }}>
        <MenuItem> Scenario </MenuItem>
        </Link>
        <MenuItem> Year  </MenuItem>
        <Link to="/Account" style={{ textDecoration: "none" }}>
        <MenuItem> Accounts/GL </MenuItem>
        </Link>
        <MenuItem> Activities </MenuItem>
        <MenuItem> Cost Centre </MenuItem>
        <MenuItem> Vendor </MenuItem>
        <MenuItem> Assets </MenuItem>
        <MenuItem> Business Services </MenuItem>
        <MenuItem> Contracts </MenuItem>
        <MenuItem> Legal Entity </MenuItem>
        <MenuItem> ICT Organization </MenuItem>
        <MenuItem> Projects </MenuItem>
        <MenuItem> Employee table (Reference Data) </MenuItem>
          {/* <MenuItem disabled>Zoom In</MenuItem>  good example can be used to disable certain menue based on access pattern*/}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const OverviewSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement={true}>
        <MenuItem>Overview</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
        <MenuItem> User Personas </MenuItem>
        <MenuItem> User stories </MenuItem>
        <MenuItem> KPIS </MenuItem>
        <MenuItem> Data Model Visual </MenuItem>
        <MenuItem> Calc Flow Visual </MenuItem>
        <MenuItem> Data Model Matrix </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NestedSubmenusControlled = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement={true}>
      <Link to="/home">
        <Button style={{ height: "40px" }}>Home</Button>
        </Link>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <OverviewSubMenu />
          <MasterDataSubMenu />
          <FormsSubMenu />
          <ReportsSubMenu />
          <SecuritySubMenu />
          <HashRouter>
          <MenuItem> Approval workflows </MenuItem>
          </HashRouter>
          <EPMEcosystemSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
