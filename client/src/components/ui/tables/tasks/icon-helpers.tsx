import { BsBriefcase, BsPerson } from 'react-icons/bs';

import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowUp,
  AiOutlineClockCircle,
} from 'react-icons/ai';

import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';

import {
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
} from '@/utils/types/task';

export function getIconByStatus(status: TaskStatus) {
  switch (status) {
    case 'TODO':
      return <MdOutlineCheckBoxOutlineBlank />;
    case 'IN_PROGRESS':
      return <AiOutlineClockCircle />;
    case 'DONE':
      return <MdOutlineCheckBox />;
  }
}

export function getIconByPriority(priority: TaskPriority) {
  switch (priority) {
    case 'HIGH':
      return <AiOutlineArrowUp />;
    case 'MEDIUM':
      return <AiOutlineArrowLeft />;
    case 'LOW':
      return <AiOutlineArrowDown />;
  }
}

export function getIconByCategory(category: TaskCategory) {
  switch (category) {
    case 'PERSONAL':
      return <BsPerson />;
    case 'WORK':
      return <BsBriefcase />;
  }
}
