import React from 'react';
import { SvgXml } from 'react-native-svg';

/**
 * Restaurant placeholder image as SVG
 * @returns {JSX.Element} SVG component
 */
const RestaurantPlaceholder = () => {
  const svgXml = `
    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="150" fill="#E0E0E0"/>
      <path d="M100 75C111.046 75 120 66.0457 120 55C120 43.9543 111.046 35 100 35C88.9543 35 80 43.9543 80 55C80 66.0457 88.9543 75 100 75Z" fill="#BDBDBD"/>
      <path d="M140 120C140 98.9543 122.091 82 100 82C77.9086 82 60 98.9543 60 120H140Z" fill="#BDBDBD"/>
      <path d="M70 30H130M70 40H130M70 120H130" stroke="#9E9E9E" stroke-width="2"/>
      <path d="M50 60V90M60 60V90M150 60V90M140 60V90" stroke="#9E9E9E" stroke-width="2"/>
      <path d="M85 55H115M100 40V70" stroke="#9E9E9E" stroke-width="2"/>
    </svg>
  `;

  return <SvgXml xml={svgXml} width="100%" height="100%" />;
};

export default RestaurantPlaceholder;
