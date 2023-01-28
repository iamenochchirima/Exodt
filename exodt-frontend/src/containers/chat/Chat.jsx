import React, { useState, useEffect , setState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageUserInfo, setActiveChatData } from '../../redux/features/api/chatSlice';
import { sendTestSocket } from '../../SocketServices';

const Chat = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [showMessage, setShowMessage] = useState(false)

  const onsubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(setMessageUserInfo(name));
      setShowMessage(true)
    }
  }

  return (
    <> {!showMessage ? (
      <div>
      <h3>Hello there, please enter your name</h3>
      <form action="" onSubmit={onsubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
    ) : (
      <MessageInterface/>
    )
  }
    </>
  )
}
export default Chat

const MessageInterface = () => {

  const dispatch = useDispatch();

  const {messageUserName, activeChatData} = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [reciever, setReciever] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (activeChatData) {
      setMessages([...messages, activeChatData])
      dispatch(setActiveChatData(null))
    }
  }, [activeChatData])

  const submitMessage = (e) => {
    e.preventDefault();
    let data = {
      sender: messageUserName,
      reciever,
      message,
    }
    setMessages([...messages, data]);
    sendTestSocket(data);
  }

  return (
    <div className="">
      <h2>Hello {messageUserName}</h2>
      <form onSubmit={submitMessage}>
        <input type="text" placeholder='Enter recievers name' value={reciever} onChange={(e) => setReciever(e.target.value)} />
      <br />
        <textarea value={message} placeholder='Type your message' onChange={(e) => setMessage(e.target.value)}></textarea>
      <br />
        <button type='submit'>Send</button>
      </form>
      <br />
      {
        messages.length < 1 ? <div className="">No messages yet</div> :
        messages.map((item, index) => {
          return (
            <div key={index}>
              <b>{item.message}</b>
              <br />
              <small>{item.sender}</small>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}