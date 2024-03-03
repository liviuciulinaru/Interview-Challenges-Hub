'use client';

import { Avatar, Box, Container, Overlay, Popover } from '@mantine/core';
import { useListState, useLocalStorage, useResizeObserver } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import CommentForm from '../Comments/Comments';

interface PinPosition {
  x: number;
  y: number;
  id: string;
  comments: string[];
}

type Props = {
  children: any;
};

const ClickableAvatarArea: React.FC<Props> = ({ children }) => {
  const [ref, rect] = useResizeObserver();
  const [visible, setVisible] = useState(true);

  // Persist pins positions in local storage
  const [storedPins, setStoredPins] = useLocalStorage<PinPosition[]>({
    key: 'pins',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  // State to hold pin positions
  const [pins, pinsHandlers] = useListState<PinPosition>([]);

  useEffect(() => {
    // On component mount, load pins from local storage
    pinsHandlers.setState(storedPins || []);
  }, [storedPins, setStoredPins]);

  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - containerRect.left; // x position within the element.
    const y = e.clientY - containerRect.top; // y position within the element.

    // Add new pin with calculated position
    pinsHandlers.append({ x, y, id: Math.random().toString(), comments: [] });
    setStoredPins(pins);
  };

  const handleResize = () => {
    pinsHandlers.setState(
      pins.map((pin) => {
        let { x, y } = pin;

        // Adjust if pin is outside the new container dimensions
        x = Math.min(x, rect.width);
        y = Math.min(y, rect.height);

        return { ...pin, x, y };
      })
    );
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Container
        ref={ref}
        onClick={handleClickContainer}
        style={{ position: 'fixed', top: 0, width: '100%', height: '100vh', cursor: 'pointer' }}
      >
        {children}
        {visible && <Overlay color="#000" backgroundOpacity={0.1} />}
      </Container>
      <Box>
        {pins.map((pin, index) => (
          <Popover key={pin.id} width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Avatar
                style={{
                  position: 'absolute',
                  left: pin.x,
                  top: pin.y,
                  transform: 'translate(-50%, -50%)',
                }}
                color="cyan"
                radius="xl"
              >
                {index}
              </Avatar>
            </Popover.Target>
            <Popover.Dropdown>
              <CommentForm />
            </Popover.Dropdown>
          </Popover>
        ))}
      </Box>
    </>
  );
};

export default ClickableAvatarArea;
