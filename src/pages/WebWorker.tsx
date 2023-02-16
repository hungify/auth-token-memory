import { useEffect, useRef, useState } from 'react';
import type { Token } from '~/interfaces/auth';

export default function WebWorker() {
  const [accessToken, setAccessToken] = useState('');
  const [count, setCount] = useState(0);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url));
    workerRef.current = worker;

    worker.addEventListener('message', (event: MessageEvent<Token>) => {
      const { type, payload } = event.data;
      if (!payload.accessToken) return;
      if (type === 'getToken') {
        setAccessToken(payload?.accessToken);
      }
    });
    return () => {
      workerRef.current?.terminate();
    };
  }, [accessToken]);

  const handleLogin = () => {
    const accessToken = '123';
    const requestToken = '321';
    workerRef.current?.postMessage({
      type: 'setToken',
      payload: {
        accessToken,
        requestToken,
      },
    });
  };

  const handleShow = () => {
    workerRef.current?.postMessage({ type: 'getAccessToken' });
    console.log('🚀 :: accessToken', accessToken);
  };

  const handleIncrease = () => {
    if (accessToken) {
      setCount(count + 1);
    }
  };

  return (
    <div className='App'>
      {accessToken ? (
        <div>
          {count}
          <button onClick={handleShow}>Show</button>
          <button onClick={handleIncrease}>Increase</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {/* <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route element={<Home />}>
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
            <Route path='register' element={<Register />} />
            <Route
              path='user-list'
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes> */}
    </div>
  );
}
