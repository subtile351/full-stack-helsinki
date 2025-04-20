const Notification = ({ message, type }) => {
    if (!message) {
        return null;
    }
  
    return (
        <div 
            className='notification' 
            style={{ color: type === 'success' ? 'green' : type === 'error' ? 'red' : 'black' }}
        >
            {message}
        </div>
    );
}

export default Notification;