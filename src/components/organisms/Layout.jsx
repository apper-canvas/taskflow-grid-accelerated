import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: 'LayoutDashboard',
      active: true
    },
    {
      name: 'All Tasks',
      href: '/#all',
      icon: 'List'
    },
    {
      name: 'Active Tasks',
      href: '/#active',
      icon: 'Clock'
    },
    {
      name: 'Completed',
      href: '/#completed',
      icon: 'CheckCircle'
    },
    {
      name: 'Categories',
      href: '/#categories',
      icon: 'Tag'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-primary-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
                <p className="text-xs text-gray-500">Streamlined Tasks</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-8">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${item.active 
                      ? 'gradient-primary text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <ApperIcon name={item.icon} size={20} className="mr-3" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Quick Stats */}
          <div className="px-4 pb-6">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Today's Progress</span>
                <ApperIcon name="TrendingUp" size={16} className="text-primary-600" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">75%</div>
              <div className="w-full bg-white/50 rounded-full h-2">
                <div className="gradient-primary h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200/50"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                    <ApperIcon name="CheckSquare" size={20} className="text-white" />
                  </div>
                  <h1 className="text-lg font-bold gradient-text">TaskFlow</h1>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="X"
                  onClick={toggleMobileMenu}
                  className="text-gray-500"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className={`
                        flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${item.active 
                          ? 'gradient-primary text-white shadow-md' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      <ApperIcon name={item.icon} size={20} className="mr-3" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                icon="Menu"
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-600"
              />

              {/* Header Title */}
              <div className="flex-1 lg:flex-none">
                <h2 className="text-xl font-semibold text-gray-900">
                  Task Management
                </h2>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Search"
                  className="text-gray-500 hover:text-gray-700"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Bell"
                  className="text-gray-500 hover:text-gray-700"
                />
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;