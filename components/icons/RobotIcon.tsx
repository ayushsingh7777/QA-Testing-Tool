
import React from 'react';

export const RobotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="15" x2="7.01" y2="15"></line>
    <line x1="17" y1="15" x2="17.01" y2="15"></line>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
    <line x1="2" y1="7" x2="22" y2="7"></line>
  </svg>
);
