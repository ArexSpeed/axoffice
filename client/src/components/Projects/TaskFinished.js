import {useState,useEffect,useContext} from 'react'
import {GlobalContext} from '../../GlobalProvider';
import db from '../../firebase';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';

const TaskFinished = ({theme, docId, taskId, title, desc, date, users, stage, setItems}) => {
  const [{userInfo}] = useContext(GlobalContext)
  const [userBox, setUserBox] = useState(false)
  useEffect(() => {
    if(users){
      users.find(user => user.name === userInfo.displayName && setUserBox(true))
    }
  },[users])

  const changeStage = () => { 
    db.collection('projects').doc(docId).collection('items').doc(taskId).update({
      stage: 'progress'
    })
    setItems([])
  }
  const deleteTask = () => {
    db.collection('projects').doc(docId).collection('items').doc(taskId).delete()
    setItems([])
  }
  
  console.log(userBox, 'userBox')
  return (
    <Accordion className={`${userBox ? `main__section-accordion finished userBox ${theme}` : `main__section-accordion finished ${theme}`} `} style={{fontFamily: '"Poppins", sans-serif'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={changeStage}
            onFocus={(event) => event.stopPropagation()}
            control={<ReplayIcon />}
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
         
          <div className="main__section-accordion-buttons">
          <ReplayIcon 
            style={{fontSize: '18px'}}
            onClick={changeStage}
          />
          <EditIcon style={{fontSize: '18px'}}/>
          <DeleteIcon 
            style={{fontSize: '18px'}}
            onClick={deleteTask}
          />
          </div>
        </AccordionDetails>
      </Accordion>
  )
}

export default TaskFinished
