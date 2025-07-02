import React from 'react';
import Badge from '@/components/atoms/Badge';
import { getPriorityColor } from '@/utils/taskUtils';

const PriorityBadge = ({ priority }) => {
  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  };

  return (
    <Badge variant={`priority-${priority}`} size="xs">
      {priorityLabels[priority]}
    </Badge>
  );
};

export default PriorityBadge;