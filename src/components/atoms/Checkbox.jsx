import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({
  checked = false,
  onChange,
  label,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={`
            w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200
            ${checked 
              ? 'gradient-primary border-transparent' 
              : 'border-gray-300 hover:border-primary-500 bg-white'
            }
          `}
          onClick={() => onChange && onChange({ target: { checked: !checked } })}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
            >
              <ApperIcon name="Check" size={12} className="text-white" />
            </motion.div>
          )}
        </div>
      </motion.div>
      {label && (
        <label 
          className="ml-3 text-sm text-gray-700 cursor-pointer"
          onClick={() => onChange && onChange({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;