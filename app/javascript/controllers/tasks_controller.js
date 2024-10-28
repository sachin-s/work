import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import App from '../components/app'

// Connects to data-controller="tasks"
export default class extends Controller {
  connect() {
        //this.element.textContent = "Hello World!"
        console.log("tasks: Hello World!");
        const app = document.getElementById('app');
        createRoot(app).render(<App />);    
  }
}