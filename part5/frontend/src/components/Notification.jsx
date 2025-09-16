const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  let color, borderColor
  switch (type) {
    case 'error':
      color = 'red'
      borderColor = 'red'
      break
    case 'warning':
      color = 'orange'
      borderColor = 'orange'
      break
    case 'success':
      color = 'green'
      borderColor = 'green'
      break
    default:
      color = 'black'
      borderColor = 'gray'
  }

  const style = {
    color,
    background: '#f4f4f4',
    border: `2px solid ${borderColor}`,
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px'
  }

  return (
    <div style={style}>
      {message}
  </div>  
  )
}

export default Notification