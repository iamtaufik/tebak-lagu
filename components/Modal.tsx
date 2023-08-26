'use client';
import { fetcher } from '@/libs/fetcher';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const Modal = (props: { isOpen: boolean }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  const createRoom = async () => {
    if (!inputRef.current) return;
    const res = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: inputRef.current.value }),
    });
    const data = await res.json();
    window.location.href = `/room/${data.code}`;
    console.log(data.code);
  };
  return (
    <div className={` top-0  relative z-10 ${!isOpen && 'hidden'} `}>
      <div className="fixed inset-0 transition-opacity bg-zinc-900 bg-opacity-40"></div>
      <div className=" container fixed inset-0 z-10 overflow-y-auto flex justify-center ">
        <div className="border">
          <button onClick={() => setIsOpen(!isOpen)}>x</button>
          <div>
            <div>
              <label>Username:</label>
              <input ref={inputRef} type="text" placeholder="username" />
            </div>
            <div>
              <button onClick={() => createRoom()}>Buat Room</button>
            </div>
            <div>
              <button>Gabung Room</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShowModal = (ev: boolean) => {
  const alert = document.createElement('div');
  alert.id = 'alert';
  document.body.appendChild(alert);
  const root = createRoot(alert);
  root.render(<Modal isOpen={ev} />);
};
