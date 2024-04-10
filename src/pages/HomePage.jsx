import MuiTable from "../components/MuiTable"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeUsername } from "../utils";
import { useForm } from "react-hook-form";
import { useState } from "react";


const HomePage = () => {
  const [searchName, setSearchName] = useState('');

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/adduser');
  }

  const handleLogout = () => {
    removeUsername();
    navigate("/signin");
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const form = useForm({
    defaultValues: {
      firstName: ''
    }
  });

  const { register } = form;

  return (
    <div>
      <h2>Welcome To User Data !</h2>
      <Button style={{marginRight:"10px"}} variant="contained" size="small" startIcon={<PersonAddAltIcon />} onClick={handleAddUser}>
        Add User
      </Button>
      
      <Button variant="outlined" size="small" startIcon={<LogoutIcon />} onClick={handleLogout}>
        Log Out
      </Button>

      <label>Search Name</label>
      <input 
      type="text"
      value={searchName}
      onChange={handleSearch}
      />
      <br />
      <MuiTable searchData={searchName}/>
    </div>
  )
}

export default HomePage