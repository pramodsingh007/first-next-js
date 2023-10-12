import classes from './MeetupDetails.module.css';


function MeetupDetails({image,title,description}) {
    return <>
        <img className={classes.img} src={image} alt="" />
        <h2 className={classes.center}>{title}</h2>
        <p className={classes.center}>{description}</p>
        <p className={classes.center}>{description}</p>
        
    </>
}



export default MeetupDetails;