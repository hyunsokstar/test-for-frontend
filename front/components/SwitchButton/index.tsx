import React from 'react'
import Switch from '@mui/material/Switch';


type Props = {
    task_status: boolean
}

function SwitchButton({task_status}: Props) {
    const [checked, setChecked] = React.useState(task_status);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };
  
    return (
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        // label='complete'
      />
    );
}

export default SwitchButton