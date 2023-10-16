import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@/components/ui/dropdown';

import { useOpen } from '@/hooks';
import { type User } from '@/utils/types/user';

interface UserMenuProps {
  onLogout: VoidFunction;
  user: User;
}

export function UserMenu(props: UserMenuProps) {
  const { onLogout, user } = props;
  const { isOpen, onClose, onToggle } = useOpen();

  return (
    <Dropdown open={isOpen} onOpenChange={onClose}>
      <DropdownTrigger asChild>
        <button className='flex items-center outline-0' onClick={onToggle}>
          <p className='px-1'>{user.email}</p>
          <span className='ml-1 text-[20px]'>
            {isOpen && <MdKeyboardArrowUp />}
            {!isOpen && <MdKeyboardArrowDown />}
          </span>
        </button>
      </DropdownTrigger>

      <DropdownPortal>
        <DropdownContent className='min-w-[200px] ' sideOffset={5}>
          <DropdownItem onClick={onClose}>
            <Link to={`/profile/${user.id}`}>Profile</Link>
          </DropdownItem>

          <DropdownItem onClick={onClose}>
            <Link to={'/job-listings/me'}>JobListings</Link>
          </DropdownItem>

          <DropdownItem>
            <Button className='w-full' onClick={onLogout} variant='contained'>
              Logout
            </Button>
          </DropdownItem>
        </DropdownContent>
      </DropdownPortal>
    </Dropdown>
  );
}
