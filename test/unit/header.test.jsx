import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../../src/client/pages/Home';

describe('Компонент Home', () => {
  test('Отображает заголовок страницы', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Kogtetochka store!/i)).toBeInTheDocument();
  });

  test('Отображает описание ассортимента', () => {
    render(<Home />);
    expect(screen.getByText(/We have a large assortment of scratching posts!/i)).toBeInTheDocument();
  });

  test('Отображает секцию "Stability"', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Stability/i })).toBeInTheDocument();
    expect(screen.getByText(/Our scratching posts are crafted with precision and designed for unparalleled stability./i)).toBeInTheDocument();
  });

  test('Отображает секцию "Comfort"', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Comfort/i })).toBeInTheDocument();
    expect(screen.getByText(/Pamper your feline friend with the luxurious comfort of our scratching posts./i)).toBeInTheDocument();
  });

  test('Отображает секцию "Design"', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Design/i })).toBeInTheDocument();
    expect(screen.getByText(/Engage your cat's natural instincts and keep them entertained for hours with our interactive scratching posts./i)).toBeInTheDocument();
  });

  test('Отображает мотивационное сообщение', () => {
    render(<Home />);
    expect(screen.getByText(/Empower Your Coding Journey with Every Scratch – Get Your Paws on Our Purr-fect Scratchers Today!/i)).toBeInTheDocument();
  });
});
