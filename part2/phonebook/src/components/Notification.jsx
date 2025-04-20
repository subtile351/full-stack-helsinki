const Notification = ({ message, type }) => {
    if (!message) {
        return null;
    }
  
    return (
        <div className='error' >
            {message}
        </div>
    );
}

export default Notification;