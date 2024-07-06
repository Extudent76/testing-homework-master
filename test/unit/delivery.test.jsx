import React from 'react';
import { render, screen } from '@testing-library/react';
import { Delivery } from '../../src/client/pages/Delivery';

describe('Компонент Delivery', () => {
  test('Отображает заголовок страницы', () => {
    render(<Delivery />);
    expect(screen.getByRole('heading', { name: /Delivery/i })).toBeInTheDocument();
  });

  test('Отображает описание доставки', () => {
    render(<Delivery />);
    expect(screen.getByText(/Swift and Secure Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience the convenience of hassle-free shipping with our scratchers/i)).toBeInTheDocument();
  });

  test('Отображает секцию "Track Your Package"', () => {
    render(<Delivery />);
    expect(screen.getByText(/Track Your Package with Ease/i)).toBeInTheDocument();
    expect(screen.getByText(/Stay informed and in control of your delivery with our easy-to-use tracking system/i)).toBeInTheDocument();
  });

  test('Отображает секцию "Customer Satisfaction"', () => {
    render(<Delivery />);
    expect(screen.getByText(/Customer Satisfaction Guaranteed/i)).toBeInTheDocument();
    expect(screen.getByText(/Your satisfaction is our top priority/i)).toBeInTheDocument();
  });
});
