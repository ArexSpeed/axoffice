import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';

const TaskInit = ({theme, docId, taskId, title, desc, date, users, stage}) => {
  return (
    <Accordion className={`main__section-accordion ${theme}`} style={{fontFamily: '"Poppins", sans-serif'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
          />
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<EditIcon style={{fontSize: '16px'}}/>}
          />
          <Typography className={`main__section-accordion-title ${theme}`}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="main__section-accordion-details">
          <Typography className={`main__section-accordion-subtitle ${theme}`}>
            {desc}
          </Typography>
          <Typography className={`main__section-accordion-subtitle ${theme}`}>
            <EventIcon /> {date}
          </Typography>
          <Typography className={`main__section-accordion-subtitle ${theme}`}>
            <PersonIcon /> 
            {users && (users.map(user => <span>{user.name}, </span>))}
            
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default TaskInit
