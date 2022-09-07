import { Box, Heading, Text } from 'grommet';

export default function Unauthorized() {
  return (
    <Box pad='medium' align='center' justify='center'>
      <Heading size='small'>Unauthorized</Heading>
      <Text>You are not authorized to access this page</Text>
    </Box>
  );
}
