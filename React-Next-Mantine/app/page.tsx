import ClickableAvatarArea from '@/components/ClickableAvatarArea/ClickableAvatarArea';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <ClickableAvatarArea>
      <Welcome />
      <ColorSchemeToggle />
    </ClickableAvatarArea>
  );
}
