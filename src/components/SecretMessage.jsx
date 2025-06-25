
import React, { useState } from 'react';

const SecretMessage = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="py-20 bg-rose-50 text-center">
      <h2 className="text-3xl font-bold mb-6">💌 Secret Message</h2>
      {show ? (
        <p className="text-xl text-rose-500 font-cute">
          I just want to say... You mean the world to me. 💖
        </p>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="px-6 py-3 text-white bg-rose-400 hover:bg-rose-500 rounded-lg transition"
        >
          Click to reveal 💖
        </button>
      )}
    </div>
  );
};

export default SecretMessage;
