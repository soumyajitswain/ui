import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('ws://localhost:7000');
  const [messageHistory, setMessageHistory] = useState([]);

  const[authRequest, setAuthRequest] = useState(['{"action":"Authorize", "user_id":"1234"}'])
  const[chargeStation, setChargeStation] = useState(['{"action":"ChargeStation", "user_id":"1234", "func":"GetAllChargeStations"}'])
  const[chargeStationConnector, setChargeStationConnector] = useState(['{"action":"ChargeStation", "user_id":"1234", "func":"ConnectorDetailByChargeBox", "charge_box_id":"1"}'])

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    sendMessage(authRequest);
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('ws://localhost:7000'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage(authRequest), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>

      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};
export default WebSocketDemo