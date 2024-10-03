const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: 'lightgray',
    fontSize: '20px',
    border: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification