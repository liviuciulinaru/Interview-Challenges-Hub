import { Text, Title } from '@mantine/core';
import classes from './NotFound.module.css';

export function NotFound() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          404
        </Text>
        Not Found
      </Title>
    </>
  );
}
