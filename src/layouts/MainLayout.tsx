import { Box, Spinner } from 'grommet';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '~/hooks';

export default function MainLayout() {
  const [loading, setLoading] = useState(true);
  const { checkAuth } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoading(false);
    };

    authenticate();
  }, [checkAuth]);

  if (loading) {
    return (
      <Box align='center' justify='center'>
        <Spinner />
      </Box>
    );
  }
  return <Outlet />;
}
