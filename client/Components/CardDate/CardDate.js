import React, { useEffect } from 'react'

function CardDate(props) {
  const { date } = props;
  
  const [ dateMentioned, setDateMentioned ] = React.useState(false);
  const [ dateStr, setDateStr ] = React.useState("");

  useEffect(() => {
    if(date === null) {
      setDateMentioned(true);
    }else {
      setDateMentioned(false);
    }
    const dateObj = new Date(date);
    setDateStr(dateObj.getDay() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear());
  },[]);

  if(dateMentioned) {
    return (
      <div>Not Mentioned<br/><br/></div>
    )
  }
  return (
    <div>{dateStr}<br/><br/></div>
  ) 
}

export default CardDate