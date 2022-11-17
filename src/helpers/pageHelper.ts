import { Component } from 'react';

export default function createPage(url: string, title: string, component: Component) {
  return { url, title, component };
}
