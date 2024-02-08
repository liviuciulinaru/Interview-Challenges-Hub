import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Error() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Error
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
    </>
  );
}
