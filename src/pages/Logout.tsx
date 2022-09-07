import { Box, Button, Paragraph } from 'grommet';
import { useAuth } from '~/hooks';

export default function Logout() {
  const { onLogout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    onLogout();
  };
  return (
    <Box pad='medium'>
      {isAuthenticated ? (
        <Button onClick={handleLogout} label='Logout' />
      ) : (
        <Paragraph size='medium'>You are not logged in</Paragraph>
      )}
    </Box>
  );
}
