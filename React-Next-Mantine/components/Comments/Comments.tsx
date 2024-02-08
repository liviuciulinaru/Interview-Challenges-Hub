// Import necessary components and hooks from React and Mantine
import { Box, Button, Flex, Text, TextInput } from '@mantine/core';

import { IconSend } from '@tabler/icons-react';

import { useState } from 'react';

interface Comment {
  id: string;
  content: string;
}

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState(''); // Local state for the current comment input
  const [comments, setComments] = useState<Comment[]>([]); // Local state for the current comment input

  // Function to handle form submission
  const handleSubmit = () => {
    if (!comment.trim()) return; // Ignore empty submissions

    // Create a new comment and add it to the list
    const newComment: Comment = { id: Math.random().toString(), content: comment };
    setComments([...comments, newComment]);
    setComment(''); // Reset the input field
  };

  return (
    <Box>
      {/* List of comments displayed above the form */}
      {comments.map((c) => (
        <Text key={c.id} size="sm" my="xs">
          {c.content}
        </Text>
      ))}
      <Flex mt="md" justify="center" align="center" gap={3}>
        <TextInput
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          placeholder="Add a comment..."
        />
        <Button onClick={handleSubmit} variant="default">
          <IconSend />
        </Button>
      </Flex>
    </Box>
  );
};

export default CommentForm;
