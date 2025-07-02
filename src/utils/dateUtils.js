import { format, isToday, isTomorrow, isYesterday, isPast, differenceInDays } from 'date-fns';

export const formatDueDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return { text: 'Today', color: 'text-accent-600', urgent: true };
  }
  
  if (isTomorrow(date)) {
    return { text: 'Tomorrow', color: 'text-warning', urgent: true };
  }
  
  if (isYesterday(date)) {
    return { text: 'Yesterday', color: 'text-danger', urgent: true };
  }
  
  const daysDiff = differenceInDays(date, new Date());
  
  if (isPast(date)) {
    const daysOverdue = Math.abs(daysDiff);
    return { 
      text: `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`, 
      color: 'text-danger', 
      urgent: true 
    };
  }
  
  if (daysDiff <= 7) {
    return { 
      text: `In ${daysDiff} day${daysDiff > 1 ? 's' : ''}`, 
      color: 'text-warning', 
      urgent: daysDiff <= 3 
    };
  }
  
  return { 
    text: format(date, 'MMM d, yyyy'), 
    color: 'text-gray-600', 
    urgent: false 
  };
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  return isPast(new Date(dateString)) && !isToday(new Date(dateString));
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM d, yyyy h:mm a');
};

export const formatDateInput = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm");
};