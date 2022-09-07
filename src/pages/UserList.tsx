import { Box, Paragraph } from 'grommet';
import { useUsersQuery } from '~/generated/graphql';

export default function UserList() {
  const { data } = useUsersQuery({
    fetchPolicy: 'no-cache',
  });
  const { getUsers } = data || {};

  return (
    <Box align='center' pad='medium'>
      {getUsers?.map((user) => (
        <Paragraph size='medium' key={user.email}>
          {user.fullName}
        </Paragraph>
      ))}
    </Box>
  );
}
